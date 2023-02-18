interface DonationOptionProps {
  option: any;
  isActive: boolean;
  onClick: () => void;
}

const DonationOption = ({ option, isActive, onClick }: DonationOptionProps) => {
  return (
    <label
      className={`block min-w-[200px] cursor-pointer rounded-full border py-2 px-4 font-heading text-2xl transition-colors duration-300 ease-in-out ${
        isActive
          ? "border-primary bg-primary text-white"
          : "border-gray-400 bg-primary-light text-gray-500"
      }`}
    >
      <input
        type="radio"
        name="id"
        value={option.id}
        onClick={onClick}
        className="hidden"
        required
      />
      <span className="block">{option.label}</span>
    </label>
  );
};

export default DonationOption;
