import { useRouter } from "next/router";
import { ChangeEvent, useMemo, useCallback, Fragment } from "react";
import FilterAccordion from "./FilterAccordion";

export type FilterType = {
  name: string;
  value: string;
  count: number;
  filterName: string;
};

export type TabOption = {
  name: string;
  filters: FilterType[];
  filterName: string;
};

export interface FilterProps {
  total: number;
  filters: TabOption[];
}

const Filter = ({ filters, total }: FilterProps) => {
  const router = useRouter();

  const isChecked = useMemo(
    () => (filter: {
      filterName: string;
      name: string;
      value: string;
      count?: number;
    }) => {
      const queryParams = new URLSearchParams(router.query as any);
      const selectedFilters = queryParams.getAll(filter.filterName);

      return selectedFilters.includes(filter.value);
    },
    [router.query]
  );

  const handleFilterChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement>,
      filter: { name: any; value: any; count?: number; filterName: string }
    ) => {
      const queryParams = new URLSearchParams(router.query as any);
      const selectedFilters = queryParams.getAll(filter.filterName);

      if (e.target.checked) {
        selectedFilters.push(filter.value);
      } else {
        const index = selectedFilters.indexOf(filter.value);
        if (index > -1) {
          selectedFilters.splice(index, 1);
        }
      }

      if (selectedFilters.length === 0) {
        queryParams.delete(filter.filterName);
      } else {
        queryParams.set(filter.filterName, selectedFilters.join(","));
      }

      const queryString = queryParams.toString();
      router.push({ pathname: router.pathname, search: queryString });
    },
    [router]
  );


  return (
    <div className={`sticky top-40 left-0 max-h-full pr-6`}>
      <h3 className={`font-body text-xl text-dark`}>{total} Total Dogs</h3>
      <form className={`mt-6 flex flex-col`}>
        <ul
          className={`flex w-full flex-col gap-4 border-t border-gray-300 font-body`}
        >
          {filters.map((filter, i) => (
            <FilterAccordion
              key={`filter-${i}`}
              title={filter?.name}
              i={i}
              open={i === 0 || filter.filters.some((f) => isChecked(f))}
            >
              {filter?.filters.map((f, j) => (
                <Fragment key={j}>
                  <label
                    htmlFor={`${filter.filterName}-${j}`}
                    className={`flex items-center gap-2 font-body`}
                  >
                    <input
                      type="checkbox"
                      id={`${filter.filterName}-${j}`}
                      name={f.name}
                      value={f.value}
                      className={`h-4 w-4`}
                      checked={isChecked(f)}
                      onChange={(e) => handleFilterChange(e, f)}
                    />
                    {f.name}
                    {f.count > 0 ? `(${f.count})` : null}
                  </label>
                </Fragment>
              ))}
            </FilterAccordion>
          ))}
        </ul>
      </form>
    </div>
  );
};

export default Filter;
