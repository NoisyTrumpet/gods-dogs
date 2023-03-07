import { Button } from "components/Button";
import PetCard from "../PetCard/PetCard";
import {
  Animal,
  AnimalConnectionEdge,
  RootQueryToAnimalConnectionEdge,
} from "graphql";
import { Key, useEffect, useMemo, useState } from "react";
import Filter from "./Fragments/Filter";
import { ANIMALS_FRAGMENT } from "fragments";

import handlePrimaryBreeds from "./Utils/handlePrimaryBreeds";
import handleSecondaryBreeds from "./Utils/handleSecondaryBreeds";
import handleSex from "./Utils/handleSex";
import handleAge from "./Utils/handleAge";
import handleWeight from "./Utils/handleWeight";
import handlePetAttributes from "./Utils/handlePetAttributes";
import capitalize from "utilities/capitalize"
import Search from "./Fragments/Search";
import { useLazyQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
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
  // Search State
  const [isSearched, setIsSearched] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  // Sort State
  const [sortBy, setSortBy] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  // General States
  const hasAnimals = animals.length > 0;
  const primaryBreedFilters = useMemo(() => handlePrimaryBreeds(animals), [animals]);
  const secondaryBreedFilters = useMemo(() => handleSecondaryBreeds(animals), [animals]);
  const sexFilters = useMemo(() => handleSex(animals), [animals]);
  const ageFilters = useMemo(() => handleAge(animals), [animals]);
  const weightFilters = useMemo(() => handleWeight(animals), [animals]);
  const attributesFilters = useMemo(() => handlePetAttributes(animals), [animals]);


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

  // Search Mutation

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
  // Sort
  const sortedAnimals = [...animals].sort((a, b) => {
    // Node
    const nodeA = a?.node as Animal;
    const nodeB = b?.node as Animal;
    // Name
    const nodeATitle = nodeA?.title as string;
    const nodeBTitle = nodeB?.title as string;
    // Age (Convert from UNIX)
    const nodeAUnix = nodeA?.animalDetails?.animalBirthday as string;
    const nodeBUnix = nodeB?.animalDetails?.animalBirthday as string;
    const nodeAUnixDate = new Date(parseInt(nodeAUnix) * 1000);
    const nodeBUnixDate = new Date(parseInt(nodeBUnix) * 1000);

    switch (sortBy) {
      case "name":
        return sortDirection === "asc"
          ? nodeATitle.localeCompare(nodeBTitle)
          : nodeBTitle.localeCompare(nodeATitle);
      case "age":
        return sortDirection === "asc"
          ? nodeAUnixDate.getTime() - nodeBUnixDate.getTime()
          : nodeBUnixDate.getTime() - nodeAUnixDate.getTime();
      default:
        return 0;
    }
  });

  // Filters
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});



  const router = useRouter();
  const { query } = router;
  const { primaryBreed, secondaryBreed, sex, weight, attributes } = query;

  useEffect(() => {
    if (primaryBreed) {
      setSelectedFilters({
        ...selectedFilters,
        primaryBreed: [primaryBreed as string],
      });
    }
    if (secondaryBreed) {
      setSelectedFilters({
        ...selectedFilters,
        secondaryBreed: [secondaryBreed as string],
      });
    }
    if (sex) {
      setSelectedFilters({
        ...selectedFilters,
        sex: [sex as string],
      });
    }
    if (weight) {
      setSelectedFilters({
        ...selectedFilters,
        weight: [weight as string],
      });
    }
    if (attributes) {
      setSelectedFilters({
        ...selectedFilters,
        attributes: [attributes as string],
      });
    }
  }, [query]);



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
        <select
          className={`w-fit`}
          onChange={(e) => {
            setSortBy(e.target.value);
          }}
        >
          <option value="">Sort By</option>
          <option value="name">{`Name ${
            sortDirection === "asc" ? "↓" : "↑"
          }`}</option>
          <option value="age">{`Age ${
            sortDirection === "asc" ? "↓" : "↑"
          }`}</option>
        </select>
        <select
          className={`w-fit`}
          onChange={(e) => {
            setSortDirection(e.target.value);
          }}
        >
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
        </select>
      </div>
      <div className={"grid grid-cols-3and4"}>
        <div className={`h-full`}>
          <Filter total={total} filters={filters} />
        </div>
        {/* Search Loading */}
        <div
          className={`grid gap-6 ${
            searchLoading || (isSearched && !hasResults)
              ? `grid-cols-1`
              : `grid-cols-3`
          }`}
        >
          {/* Search Loading... */}
          {searchLoading && !hasResults ? (
            <div
              className={`flex h-full w-full flex-col items-center justify-center`}
            >
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
            ? sortedAnimals.map((animal: AnimalConnectionEdge, index: Key) => {
                const node = animal?.node as Animal;

                const {
                  primaryBreed,
                  secondaryBreed,
                  sex,
                  age,
                  weight,
                  attributes,
                } = selectedFilters;

                if (
                  primaryBreed &&
                  !primaryBreed[0].includes(
                    node?.primaryBreeds?.nodes[0]?.slug as string
                  )
                ) {
                  return null;
                }
                if (
                  secondaryBreed &&
                  !secondaryBreed[0].includes(
                    node?.secondaryBreeds?.nodes[0]?.slug as string
                  )
                ) {
                  return null;
                }
                if (
                  sex &&
                  !sex[0].includes(node?.animalDetails?.animalSex?.toLowerCase() as string)
                ) {
                  return null;
                }
                if (
                  weight &&
                  !weight[0].includes(node?.ageGroups?.nodes[0].slug as string)
                ) {
                  return null;
                }

                if (
                  age &&
                  !age[0].includes(node?.ageGroups?.nodes[0].slug as string)
                ) {
                  return null;
                }

                if (
                  attributes &&
                  !attributes[0].includes(
                    node?.petAttributes?.nodes[0].slug as string
                  )
                ) {
                  return null;
                }

                return (
                  <PetCard
                    key={`${node?.id}-${index}`}
                    variant="basic"
                    pet={{...node}}
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
