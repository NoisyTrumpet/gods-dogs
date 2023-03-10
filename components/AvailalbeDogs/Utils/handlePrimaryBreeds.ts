import { Animal, AnimalConnectionEdge, SecondaryBreed } from "graphql";
import { FilterType } from "../Fragments/Filter";

function handlePrimaryBreeds(animalArray: AnimalConnectionEdge[]) {
  const breedCounts = new Map<string, number>();
  const breedNames = new Map<string, string>();

  animalArray.forEach((animal) => {
    const node = animal?.node as Animal;
    const primaryBreeds = node?.primaryBreeds?.nodes as SecondaryBreed[];
    if (primaryBreeds) {
      primaryBreeds.forEach((breed) => {
        const slug = breed?.slug;
        const name = breed?.name;
        if (slug) {
          breedCounts.set(slug, (breedCounts.get(slug) || 0) + 1);
          breedNames.set(slug, name || "");
        }
      });
    }
  });

  const primaryBreeds = [] as FilterType[];
  breedCounts.forEach((count, slug) => {
    const name = breedNames.get(slug);
    primaryBreeds.push({
      name: name || "",
      value: slug,
      count: count,
      filterName: "primaryBreed",
    });
  });

  return primaryBreeds;
}

export default handlePrimaryBreeds;
