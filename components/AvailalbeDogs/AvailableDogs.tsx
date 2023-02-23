import { Button } from "components/Button";
import PetCard from "../PetCard/PetCard";
import {
  Animal,
  AnimalConnectionEdge,
  PrimaryBreed,
  RootQueryToAnimalConnectionEdge,
} from "graphql";
import { Key, useState } from "react";
import Filter, { FilterType, TabOption } from "./Fragments/Filter";

import handlePrimaryBreeds from "./Utils/handlePrimaryBreeds";
import handleSecondaryBreeds from "./Utils/handleSecondaryBreeds";
import handleSex from "./Utils/handleSex";
import handleAge from "./Utils/handleAge";
import handleWeight from "./Utils/handleWeight";
import handlePetAttributes from "./Utils/handlePetAttributes";
interface AvailableDogsProps {
  animals: AnimalConnectionEdge[] | RootQueryToAnimalConnectionEdge;
  loadMore?: () => void;
  loading?: boolean;
  hasMore?: boolean;
  total: number;
}

const AvailableDogs = ({
  animals,
  loadMore,
  loading,
  hasMore,
  total,
}: AvailableDogsProps) => {
  const animalArray = animals as AnimalConnectionEdge[];
  const hasAnimals = animalArray.length > 0;

  const primaryBreedFilters = handlePrimaryBreeds(animalArray);
  const secondaryBreedFilters = handleSecondaryBreeds(animalArray);
  const sexFilters = handleSex(animalArray);
  const ageFilters = handleAge(animalArray);
  const weightFilters = handleWeight(animalArray);
  const attributesFilters = handlePetAttributes(animalArray);

  const filters = [
    {
      name: "Primary Breed",
      filters: primaryBreedFilters,
    },
    {
      name: "Secondary Breed",
      filters: secondaryBreedFilters,
    },
    {
      name: "Sex",
      filters: sexFilters,
    },
    {
      name: "Age",
      filters: ageFilters,
    },
    {
      name: "Size Groups",
      filters: weightFilters,
    },
    {
      name: "Attributes",
      filters: attributesFilters,
    },
  ];

  return (
    <div className={`container relative mx-auto`}>
      <div
        className={`search-header my-10 flex w-full flex-row border-b-[1px] border-b-slate-500 pb-7`}
      >
        <h2
          className={`w-fit py-3 font-heading text-5xl leading-none text-dark`}
        >
          Available Dogs
        </h2>
        <input
          type="text"
          className={`mx-10 flex-1 rounded-full bg-[#F4F4F4] px-6`}
          placeholder="Search"
        />
        <select className={`w-fit`}>
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="age">Age</option>
          <option value="breed">Breed</option>
        </select>
      </div>
      <div className={"flex flex-row"}>
        <div className={`w-1/4`}>
          <Filter total={total} filters={filters} />
        </div>
        <div className={`grid w-3/4 grid-cols-3 gap-6`}>
          {hasAnimals
            ? animalArray.map((animal: AnimalConnectionEdge, index: Key) => {
                const node = animal?.node as Animal;

                return (
                  <PetCard
                    key={`${node?.id}-${index}`}
                    variant="basic"
                    pet={node}
                  />
                );
              })
            : null}
        </div>
      </div>
      {/* Load More */}
      {hasMore && (
        <div className={`my-10 flex justify-center`}>
          <Button
            className={`mx-auto w-fit`}
            onClick={loadMore}
            variant={`primary`}
            disabled={loading}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default AvailableDogs;
