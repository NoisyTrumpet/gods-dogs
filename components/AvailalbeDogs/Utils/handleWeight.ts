import { Animal, AnimalConnectionEdge, WeightGroup } from "graphql";
import { FilterType } from "../Fragments/Filter";

function handleWeight(animalArray: AnimalConnectionEdge[]) {
  const weightCounts = new Map<string, number>();
  const weightNames = new Map<string, string>();

  animalArray.forEach((animal) => {
    const node = animal?.node as Animal;
    const weightGroups = node?.weightGroups?.nodes as WeightGroup[];
    if (weightGroups) {
      weightGroups.forEach((weight) => {
        const slug = weight?.slug;
        const name = weight?.name;
        if (slug) {
          weightCounts.set(slug, (weightCounts.get(slug) || 0) + 1);
          weightNames.set(slug, name || "");
        }
      });
    }
  });

  const weights = [] as FilterType[];
  weightCounts.forEach((count, slug) => {
    const name = weightNames.get(slug);
    weights.push({
      name: name || "",
      value: slug,
      count: count,
      filterName: "weight"
    });
  });

  return weights;
}

export default handleWeight;
