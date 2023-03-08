import { Animal, AnimalConnectionEdge } from "graphql";
import { FilterType } from "../Fragments/Filter";

function handleSex(animalArray: AnimalConnectionEdge[]) {
  const sexCounts = new Map<string, number>();

  animalArray.forEach((animal) => {
    const node = animal?.node as Animal;
    const sex = node?.animalDetails?.animalSex;
    if (sex) {
      sexCounts.set(sex, (sexCounts.get(sex) || 0) + 1);
    }
  });

  const sexList = [] as FilterType[];
  sexCounts.forEach((count, sex) => {
    sexList.push({
      name: sex,
      value: sex.toLowerCase(),
      count: count,
      filterName: "sex",
    });
  });

  return sexList;
}

export default handleSex;
