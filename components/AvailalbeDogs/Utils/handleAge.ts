import { AnimalConnectionEdge } from "graphql";
import { FilterType } from "../Fragments/Filter";

interface AgeGroup {
  name: string;
  slug: string;
  termTaxonomyId: number;
}

function handleAge(animalArray: AnimalConnectionEdge[]) {
  const ageCounts = new Map<string, number>();
  const ageNames = new Map<string, string>();

  animalArray.forEach((animal) => {
    const node = animal?.node;
    const ageGroups = node?.ageGroups?.nodes as AgeGroup[];
    if (ageGroups) {
      ageGroups.forEach((age) => {
        const slug = age?.slug;
        const name = age?.name;
        if (slug) {
          ageCounts.set(slug, (ageCounts.get(slug) || 0) + 1);
          ageNames.set(slug, name || "");
        }
      });
    }
  });

  const ageGroups = [] as FilterType[];
  ageCounts.forEach((count, slug) => {
    const name = ageNames.get(slug);
    ageGroups.push({
      name: name || "",
      value: slug,
      count: count,
      filterName: "age",
    });
  });

  return ageGroups;
}

export default handleAge;
