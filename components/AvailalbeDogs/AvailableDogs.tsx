import { Button } from "components/Button";
import PetCard from "../PetCard/PetCard";
import {
  Animal,
  AnimalConnectionEdge,
  AnimalToPrimaryBreedConnection,
  PrimaryBreed,
  RootQueryToAnimalConnectionEdge,
} from "graphql";
import { Key, useEffect, useState } from "react";
import Filter, { FilterType, TabOption } from "./Fragments/Filter";

import handlePrimaryBreeds from "./Utils/handlePrimaryBreeds";
import handleSecondaryBreeds from "./Utils/handleSecondaryBreeds";
import handleSex from "./Utils/handleSex";
import handleAge from "./Utils/handleAge";
import handleWeight from "./Utils/handleWeight";
import handlePetAttributes from "./Utils/handlePetAttributes";
import { useRouter } from "next/router";
import { isFiltered } from "./Utils/isFiltered";
interface AvailableDogsProps {
  animals: AnimalConnectionEdge[] | RootQueryToAnimalConnectionEdge[];
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
  const hasAnimals = animals.length > 0;
  const primaryBreedFilters = handlePrimaryBreeds(animals);
  const secondaryBreedFilters = handleSecondaryBreeds(animals);
  const sexFilters = handleSex(animals);
  const ageFilters = handleAge(animals);
  const weightFilters = handleWeight(animals);
  const attributesFilters = handlePetAttributes(animals);


  const filters = [
    {
      name: "Primary Breed",
      filters: primaryBreedFilters,
      filterName: "primaryBreed",
    },
    {
      name: "Secondary Breed",
      filters: secondaryBreedFilters,
      filterName: "secondaryBreed",
    },
    {
      name: "Sex",
      filters: sexFilters,
      filterName: "sex"
    },
    {
      name: "Age",
      filters: ageFilters,
      filterName: "age"
    },
    {
      name: "Size Groups",
      filters: weightFilters,
      filterName: "weight"
    },
    {
      name: "Attributes",
      filters: attributesFilters,
      filterName: "attributes"
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
      <div className={"grid grid-cols-3and4"}>
        <div className={`h-full`}>
          <Filter total={total} filters={filters} />
        </div>
        <div className={`grid grid-cols-3 gap-6`}>
          {hasAnimals
            ? animals.map((animal: AnimalConnectionEdge, index: Key) => {
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
