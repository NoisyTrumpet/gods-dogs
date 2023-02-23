import { useRouter } from "next/router";
import { useState } from "react";
import FilterAccordion from "./FilterAccordion";

export type FilterType = {
  name: string;
  value: string;
  count: number;
};

export type TabOption = {
  name: string;
  filters: FilterType[];
  isOpen?: boolean;
};

export interface FilterProps {
  total: number;
  filters: TabOption[];
  setFilters?: (filters: FilterType[]) => void;
}

const Filter = ({ filters, setFilters, total }: FilterProps) => {
  // Url Query Params
  const router = useRouter();

  return (
    <div className={`w-full pr-6`}>
      <h3 className={`font-body text-xl text-dark`}>{total} Total Dogs</h3>
      <form className={`relative mt-6 flex flex-col`}>
        <ul
          className={`flex w-full flex-col gap-4 border-t border-gray-300 font-body`}
        >
          {filters.map((filter, i) => {
            return (
              <FilterAccordion
                key={`filter-${i}`}
                title={filter?.name}
                i={i}
                open={i === 0}
              >
                {filter?.filters.map((f, i) => {
                  return (
                    <div key={i} className={`flex justify-between`}>
                      <label
                        htmlFor={f.value}
                        className={`flex items-center gap-2 font-body`}
                      >
                        <input
                          type="checkbox"
                          id={f.value}
                          name={f.name}
                          value={f.value}
                          className={`h-4 w-4`}
                        />
                        {f.name}
                        <span>{f.count > 0 ? `(${f.count})` : null}</span>
                      </label>
                    </div>
                  );
                })}
              </FilterAccordion>
            );
          })}
        </ul>
      </form>
    </div>
  );
};

export default Filter;
