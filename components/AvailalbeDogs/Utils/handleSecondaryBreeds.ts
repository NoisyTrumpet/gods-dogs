import { Animal, AnimalConnectionEdge, SecondaryBreed } from "graphql";
import { FilterType } from "../Fragments/Filter";

function handleSecondaryBreeds(animalArray: AnimalConnectionEdge[]) {
  const breedCounts = new Map<string, number>();
  const breedNames = new Map<string, string>();

  animalArray.forEach((animal) => {
    const node = animal?.node as Animal;
    const secondaryBreeds = node?.secondaryBreeds?.nodes as SecondaryBreed[];
    if (secondaryBreeds) {
      secondaryBreeds.forEach((breed) => {
        const slug = breed?.slug;
        const name = breed?.name;
        if (slug) {
          breedCounts.set(slug, (breedCounts.get(slug) || 0) + 1);
          breedNames.set(slug, name || "");
        }
      });
    }
  });

  const secondaryBreeds = [] as FilterType[];
  breedCounts.forEach((count, slug) => {
    const name = breedNames.get(slug);
    secondaryBreeds.push({
      name: name || "",
      value: slug,
      count: count,
    });
  });

  return secondaryBreeds;
}

export default handleSecondaryBreeds;
