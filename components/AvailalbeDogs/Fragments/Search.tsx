interface SearchProps {
  className?: string;
  handleSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ className, handleSearch }: SearchProps) => {
  return (
    <input
      type="text"
      placeholder="Search"
      className={className ?? ``}
      onChange={handleSearch}
    />
  );
};

export default Search;
