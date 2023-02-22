import { Key } from "react";
import PetCard from "../PetCard/PetCard";
interface AvailableDogsProps {
  animals: any 
}

const AvailableDogs = ({animals} : AvailableDogsProps) => {
  return (
    <div
      className={`container relative mx-auto`}
    >
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
        <div className={`w-1/4`}>Search Filters</div>
        <div className={`w-3/4 grid grid-cols-3 gap-6`}>
          {animals.map((animal: any, index: Key) => {
            return (
              <PetCard
                key={index}
                variant="basic"
                pet={animal.node}
              />
            );
          })
          }
        </div>
      </div>
    </div>
  );
};

export default AvailableDogs;
