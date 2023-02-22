const AvailableDogs = () => {
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
      <div className={"grid grid-cols-2 gap-3"}>
        <div className={`w-1/6`}>Search Filters</div>
        <div className={`w-5/6`}>
          All of the Pets
        </div>
      </div>
    </div>
  );
};

export default AvailableDogs;
