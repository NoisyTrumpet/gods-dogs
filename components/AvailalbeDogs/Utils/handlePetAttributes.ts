import { Animal, AnimalConnectionEdge } from "graphql";
import { FilterType } from "../Fragments/Filter";

interface PetAttribute {
  slug: string;
  name: string;
}

function handlePetAttributes(animalArray: AnimalConnectionEdge[]) {
  const petAttributeCounts = new Map<string, number>();
  const petAttributeNames = new Map<string, string>();

  animalArray.forEach((animal) => {
    const node = animal?.node as Animal;
    const petAttributes = node?.petAttributes?.nodes as PetAttribute[];
    if (petAttributes) {
      petAttributes.forEach((attribute) => {
        const slug = attribute?.slug;
        const name = attribute?.name;
        if (slug) {
          petAttributeCounts.set(slug, (petAttributeCounts.get(slug) || 0) + 1);
          petAttributeNames.set(slug, name || "");
        }
      });
    }
  });

  const petAttributes = [] as FilterType[];
  petAttributeCounts.forEach((count, slug) => {
    const name = petAttributeNames.get(slug);
    petAttributes.push({
      name: name || "",
      value: slug,
      count: count,
      filterName: "attributes"
    });
  });

  return petAttributes;
}

export default handlePetAttributes;
