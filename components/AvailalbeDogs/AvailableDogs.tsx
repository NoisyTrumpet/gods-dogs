import { Button } from "components/Button";
import PetCard from "../PetCard/PetCard";
import {
  Animal,
  AnimalConnectionEdge,
  RootQueryToAnimalConnectionEdge,
} from "graphql";
import { Key, useEffect, useState } from "react";
import Filter from "./Fragments/Filter";
import { ANIMALS_FRAGMENT } from "fragments";

import handlePrimaryBreeds from "./Utils/handlePrimaryBreeds";
import handleSecondaryBreeds from "./Utils/handleSecondaryBreeds";
import handleSex from "./Utils/handleSex";
import handleAge from "./Utils/handleAge";
import handleWeight from "./Utils/handleWeight";
import handlePetAttributes from "./Utils/handlePetAttributes";
import Search from "./Fragments/Search";
import { useLazyQuery, gql } from "@apollo/client";
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
      filterName: "sex",
    },
    {
      name: "Age",
      filters: ageFilters,
      filterName: "age",
    },
    {
      name: "Size Groups",
      filters: weightFilters,
      filterName: "weight",
    },
    {
      name: "Attributes",
      filters: attributesFilters,
      filterName: "attributes",
    },
  ];

  // Search Animals
  const [isSearched, setIsSearched] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [
    searchAnimals,
    { data: searchData, loading: searchLoading, error: searchError },
  ] = useLazyQuery(
    gql`
      query SearchAnimals($search: String!) {
        animals(first: 20, where: { search: $search }) {
          ...AnimalsFragment
        }
      }
      ${ANIMALS_FRAGMENT}
    `,
    {
      onCompleted: (data) => {
        if (searchValue !== "") {
          setIsSearched(true);
        } else {
          setIsSearched(false);
        }
      },
    }
  );

  const hasSearchValue = searchValue !== "";
  const hasResults = searchData?.animals?.edges?.length > 0;

  // Handle Search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    setSearchValue(search);
    searchAnimals({
      variables: {
        search,
      },
    });
  };

  return (
    <div className={`container relative mx-auto pb-8`}>
      <div
        className={`search-header my-10 flex w-full flex-row border-b-[1px] border-b-slate-500 pb-7`}
      >
        <h2
          className={`w-fit py-3 font-heading text-5xl leading-none text-dark`}
        >
          Available Dogs
        </h2>
        <Search
          className={`mx-10 flex-1 rounded-full bg-[#F4F4F4] px-6`}
          handleSearch={handleSearch}
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
        {/* Search Loading */}
        <div
          className={`grid gap-6 ${
            searchLoading || !hasResults ? `grid-cols-1` : `grid-cols-3`
          }`}
        >
          {/* Search Loading... */}
          {searchLoading && !hasResults ? (
            <div className={`flex flex-col h-full w-full items-center justify-center`}>
              <p className={`loader font-heading text-lg`}>
                {`Searching for ${searchValue}...`}
              </p>
              <div className="flex items-center justify-center">
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              </div>
            </div>
          ) : null}
          {/* No Search Results */}
          {!searchLoading && !hasResults && isSearched ? (
            <div className={`flex h-full w-full items-center justify-center`}>
              <p className={`font-heading text-lg`}>
                {`Ooops! No results found for ${searchValue}, please try again.`}
              </p>
            </div>
          ) : null}
          {/* Has Animals */}
          {hasAnimals && !isSearched && !hasSearchValue
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
          {/* Has Search Results */}
          {isSearched
            ? searchData?.animals?.edges?.map(
                (animal: AnimalConnectionEdge, index: Key) => {
                  const node = animal?.node as Animal;

                  return (
                    <PetCard
                      key={`${node?.id}-${index}`}
                      variant="basic"
                      pet={node}
                    />
                  );
                }
              )
            : null}
        </div>
      </div>
      {/* Load More */}
      {hasMore && !isSearched ? (
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
      ) : null}
    </div>
  );
};

export default AvailableDogs;
