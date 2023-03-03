import { Animal, AnimalConnectionEdge } from "graphql";
import { FilterType, TabOption } from "../Fragments/Filter";

export function isFiltered(animal: Animal, filters: {
    primaryBreed: string;
    secondaryBreed: string;
    age: string;
    weight: string;
    sex: string;
    petAttribute: string;
    weightGroup: string;
}) {
  const petAttributes = animal?.petAttributes?.nodes || [];

  // Check if any pet attribute filters are applied
  if (petAttributes.length > 0) {
    console.log(filters)
    // const selectedPetAttributes = new Set(
    //   filters.filter((filter: { filterName: string; }) => filter.filterName === "petAttribute").map((filter: { value: any; }) => filter.value)
    // );
    // const matchingPetAttributes = petAttributes.filter((attr) => selectedPetAttributes.has(attr?.slug || ""));
    // if (matchingPetAttributes.length === 0) {
    //   return false;
    // }
  }

//   // Check if any sex filters are applied
//   const animalSex = animal?.animalDetails?.animalSex?.toLowerCase() || "";
//   const selectedSexFilters = new Set(
//     filters.filter((filter) => filter.filterName === "sex").map((filter) => filter.value.toLowerCase())
//   );
//   if (selectedSexFilters.size > 0 && !selectedSexFilters.has(animalSex)) {
//     return false;
//   }

//   // Check if any age filters are applied
//   const ageGroups = animal?.ageGroups?.nodes || [];
//   if (ageGroups.length > 0) {
//     const selectedAgeGroups = new Set(
//       filters.filter((filter) => filter.filterName === "age").map((filter) => filter.value)
//     );
//     const matchingAgeGroups = ageGroups.filter((group) => selectedAgeGroups.has(group?.slug || ""));
//     if (matchingAgeGroups.length === 0) {
//       return false;
//     }
//   }

//   // Check if any weight filters are applied
//   const weightGroups = animal?.weightGroups?.nodes || [];
//   if (weightGroups.length > 0) {
//     const selectedWeightGroups = new Set(
//       filters.filter((filter) => filter.filterName === "weight").map((filter) => filter.value)
//     );
//     const matchingWeightGroups = weightGroups.filter((group) => selectedWeightGroups.has(group?.slug || ""));
//     if (matchingWeightGroups.length === 0) {
//       return false;
//     }
//   }

//   // Check if any primary breed filters are applied
//   const primaryBreeds = animal?.primaryBreeds?.nodes || [];
//   if (primaryBreeds.length > 0) {
//     const selectedPrimaryBreeds = new Set(
//       filters.filter((filter) => filter.filterName === "primaryBreed").map((filter) => filter.value)
//     );
//     const matchingPrimaryBreeds = primaryBreeds.filter((breed) => selectedPrimaryBreeds.has(breed?.slug || ""));
//     if (matchingPrimaryBreeds.length === 0) {
//       return false;
//     }
//   }

//   // Check if any secondary breed filters are applied
//   const secondaryBreeds = animal?.secondaryBreeds?.nodes || [];
//   if (secondaryBreeds.length > 0) {
//     const selectedSecondaryBreeds = new Set(
//       filters.filter((filter) => filter.filterName === "secondaryBreed").map((filter) => filter.value)
//     );
//     const matchingSecondaryBreeds = secondaryBreeds.filter((breed) =>
//       selectedSecondaryBreeds.has(breed?.slug || "")
//     );
//     if (matchingSecondaryBreeds.length === 0) {
//       return false;
//     }
//   }

  return true;
}
