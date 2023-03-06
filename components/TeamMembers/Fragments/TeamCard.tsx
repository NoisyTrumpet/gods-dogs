import { Button } from "../../Button";
import { FeaturedImage } from "components/FeaturedImage";

export interface TeamCardProps {
  member: any;
  className?: string;
}

const TeamCard = ({ member, className }: TeamCardProps) => {
  const {
    name,
    teamMemberOptions: { title, headshot, email },
  } = member;

  return (
    <div
      className={`flex flex-col justify-center rounded-lg bg-gray-50 p-5 shadow-lg shadow-stone-300`}
    >
      <div className={`w-full overflow-hidden rounded-lg`}>
        {headshot ? (
          <FeaturedImage
            image={headshot}
            className={`w-full`}
            imgClassName="w-full"
          />
        ) : null}
      </div>
      <div className={`w-full`}>
        {name ? (
          <h2
            className={`my-4 border-b-2 border-gray-300 pb-4 text-center font-heading text-4xl leading-none text-dark`}
          >
            {name}
          </h2>
        ) : null}
        {title ? (
          <h6 className={`pb-4 text-center text-med-dark`}>{title}</h6>
        ) : null}
        <div className={`flex flex-col gap-4`}>
          {email ? (
            <Button
              className={`w-full`}
              variant={`secondary`}
              href={email?.url ?? "#"}
              target={email?.target ?? "_self"}
            >
              {email?.title}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
