import { useRouter } from "next/router";
import { ChangeEvent, useMemo, Fragment } from "react";
import FilterAccordion from "./FilterAccordion";
import { BsFilterCircle } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { AnimatePresence, m, LazyMotion, useCycle } from "framer-motion";
const loadFeatures = () =>
  import("utilities/framerFeatures.js").then((res) => res.default);
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
  const [open, cycleOpen] = useCycle(false, true);

  const selectedFilters = useMemo(() => {
    const queryParams = new URLSearchParams(router.query as any);
    const filters: { [key: string]: string[] } = {};

    for (const [key, value] of queryParams.entries()) {
      filters[key] = value.split(",");
    }

    return filters;
  }, [router.query]);

  const isChecked = (filter: FilterType) => {
    return selectedFilters[filter.filterName]?.includes(filter.value);
  };

  const handleFilterChange = (
    e: ChangeEvent<HTMLInputElement>,
    filter: FilterType
  ) => {
    const queryParams = new URLSearchParams(router.query as any);
    const filters = selectedFilters[filter.filterName] || [];

    if (e.target.checked) {
      filters.push(filter.value);
    } else {
      const index = filters.indexOf(filter.value);
      if (index > -1) {
        filters.splice(index, 1);
      }
    }

    if (filters.length === 0) {
      queryParams.delete(filter.filterName);
    } else {
      queryParams.set(filter.filterName, filters.join(","));
    }

    const queryString = queryParams.toString();
    router.push({ pathname: router.pathname, search: queryString });
  };

  return (
    <>
      <div className="sticky top-40 left-0 flex max-h-full w-full flex-row justify-between px-2 lg:flex-col lg:pr-6 lg:pl-0">
        <h3 className="font-body text-xl text-dark">{total} Total Dogs</h3>
        <div className={`flex lg:hidden`}>
          <button onClick={() => cycleOpen()}>
            <BsFilterCircle className="text-primary" />
          </button>
        </div>
        <form className="mt-6 hidden flex-col lg:flex">
          <ul className="flex w-full flex-col gap-4 border-t border-gray-300 font-body">
            {filters.map((filter, i) => (
              <FilterAccordion
                key={`filter-${i}`}
                title={filter?.name}
                i={i}
                open={i === 0 || filter.filters.some(isChecked)}
              >
                {filter?.filters.map((f, j) => (
                  <Fragment key={j}>
                    <label
                      htmlFor={`${filter.filterName}-${j}`}
                      className="flex items-center gap-2 font-body"
                    >
                      <input
                        type="checkbox"
                        id={`${filter.filterName}-${j}`}
                        name={f.name}
                        value={f.value}
                        className="absolute h-8 w-8 opacity-0"
                        checked={isChecked(f)}
                        onChange={(e) => handleFilterChange(e, f)}
                      />
                      <div className="mr-2 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-primary bg-white focus-within:border-primary hover:cursor-pointer">
                        <svg
                          className="pointer-events-none hidden h-3 w-3 fill-current text-white"
                          version="1.1"
                          viewBox="0 0 17 12"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g fill="none" fill-rule="evenodd">
                            <g
                              transform="translate(-9 -11)"
                              fill="#fff"
                              fill-rule="nonzero"
                            >
                              <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
                            </g>
                          </g>
                        </svg>
                      </div>
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
      <LazyMotion features={loadFeatures}>
        <AnimatePresence>
          {open ? (
            <m.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-0 left-0 bottom-0 z-[100] h-full w-full overflow-auto bg-white px-4 py-6"
            >
              <button
                className={`absolute top-0 right-0 p-4`}
                onClick={() => cycleOpen()}
                aria-label="Close"
              >
                <IoCloseSharp className="text-4xl text-primary" />
              </button>
              <form className="mt-6 flex flex-col lg:flex">
                <h3 className="font-body text-xl text-dark">Filters:</h3>
                <ul className="flex w-full flex-col gap-4 border-t border-gray-300 font-body">
                  {filters.map((filter, i) => (
                    <FilterAccordion
                      key={`filter-${i}`}
                      title={filter?.name}
                      i={i}
                      open={i === 0 || filter.filters.some(isChecked)}
                    >
                      {filter?.filters.map((f, j) => (
                        <Fragment key={j}>
                          <label
                            htmlFor={`${filter.filterName}-${j}`}
                            className="flex items-center gap-2 font-body"
                          >
                            <input
                              type="checkbox"
                              id={`${filter.filterName}-${j}`}
                              name={f.name}
                              value={f.value}
                              className="absolute h-8 w-8 opacity-0"
                              checked={isChecked(f)}
                              onChange={(e) => handleFilterChange(e, f)}
                            />
                            <div className="mr-2 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-primary bg-white focus-within:border-primary hover:cursor-pointer">
                              <svg
                                className="pointer-events-none hidden h-3 w-3 fill-current text-white"
                                version="1.1"
                                viewBox="0 0 17 12"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g fill="none" fill-rule="evenodd">
                                  <g
                                    transform="translate(-9 -11)"
                                    fill="#fff"
                                    fill-rule="nonzero"
                                  >
                                    <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
                                  </g>
                                </g>
                              </svg>
                            </div>
                            {f.name}
                            {f.count > 0 ? `(${f.count})` : null}
                          </label>
                        </Fragment>
                      ))}
                    </FilterAccordion>
                  ))}
                </ul>
              </form>
            </m.div>
          ) : null}
        </AnimatePresence>
      </LazyMotion>
    </>
  );
};

export default Filter;
