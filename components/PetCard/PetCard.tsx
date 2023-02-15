import { Button } from "../Button";

export interface PetCardProps {
  pet: any;
  variant: string;
  className?: string;
}

const PetCard = ({ pet, variant, className }: PetCardProps) => {
  const isFeatured = variant === "featured";
  const isBasic = variant === "basic";

  const trimmedContent = (content: any) => {
    if (content) {
      const strip = content.replace(/(<([^>]+)>)/gi, "");
      const trimmed = strip.substring(0, 200);
      return trimmed + "...";
    }
    return content;
  };

  const card = isFeatured
    ? `flex flex-col justify-center md:flex-row`
    : `bg-gray-50 shadow-lg shadow-stone-300 mx-5 rounded-lg flex flex-col justify-center p-5`;

  const cardImage = isFeatured
    ? `order-last flex h-[300px] flex-col gap-6 md:order-first md:h-[465px] md:w-1/2`
    : `w-full rounded-lg overflow-hidden`;

  const cardContent = isFeatured
    ? `align-center order-last flex flex-col justify-center gap-6 px-12 py-8 md:w-1/2`
    : `w-full`;

  const petName = isFeatured
    ? `font-heading text-5xl leading-none text-dark`
    : `font-heading text-4xl leading-none text-dark my-4 flex justify-between border-b-2 border-gray-300 pb-4`;

  return (
    <div className={card}>
      <div className={cardImage}>
        <img
          src={pet?.featuredImage?.node.sourceUrl!}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top",
          }}
        />
      </div>
      <div className={cardContent}>
        <h2 className={petName}>
          <span className="flex-1">
            {isFeatured ? "Hi, I'm " : ""}
            {pet?.animalDetails?.animalName}
          </span>
          {isBasic && (
            <span className={`h-[40px] w-[24px]`}>
              <img
                src="/icons/icon-male.svg"
                width="24"
                height="40"
                alt="Male Symbol"
              />
            </span>
          )}
        </h2>
        {isFeatured && (
          <div
            dangerouslySetInnerHTML={{
              __html: trimmedContent(pet?.content),
            }}
          />
        )}
        <div className={`flex flex-col gap-4`}>
          <Button
            className={isFeatured ? "w-fit" : "w-full"}
            variant={isFeatured ? "secondary-outline" : "secondary"}
          >
            {isBasic ? "Learn More" : "Adopt Me"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
