import TeamCard from "./Fragments/TeamCard";
import { Page_Flexiblecontent_Blocks_TeamMembers } from "graphql";
export interface TeamMembersProps
  extends Page_Flexiblecontent_Blocks_TeamMembers {
  className?: string;
}

const TeamMembers = ({ className, members, title }: TeamMembersProps) => {
  const hasMembers = members && members.length > 0;

  return (
    <>
      {hasMembers && (
        <div className={`${className} relative my-10 px-2`}>
          <h3
            className={`my-4 pb-4 text-center font-heading text-6xl leading-none text-dark`}
          >
            {title}
          </h3>
          <div
            className={`container relative mx-auto flex flex-col md:flex-row md:px-4 xl:max-w-7xl`}
          >
            <div
              className={`relative flex flex-row flex-wrap pb-5 md:px-20 md:pb-0`}
              // grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6
            >
              {members?.map((member, index) => {
                return (
                  <div
                    key={member?.databaseId}
                    className={`w-full p-3 sm:w-1/2 lg:w-1/3 xl:w-1/4`}
                  >
                    <TeamCard member={member} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TeamMembers;
