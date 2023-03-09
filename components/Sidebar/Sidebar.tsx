import { Button } from "components/Button";
import { FeaturedImage } from "components/FeaturedImage";
import Link from "next/link";
import DonationForm from "features/DonationForm/DonationForm";
import { Key } from "react";
import { PetCard } from "../PetCard";
import {
  Animal,
  AnimalConnectionEdge,
  RootQueryToAnimalConnectionEdge,
} from "graphql";

export interface SidebarProps {
  dogsWidget: boolean;
  donateWidget: boolean;
  animals: RootQueryToAnimalConnectionEdge[];
}

const Sidebar = ({ animals, donateWidget, dogsWidget }: SidebarProps) => {
  return (
    <div className={`flex flex-col gap-4 p-4`}>
      {dogsWidget ? (
        <div className={`bg-primary-light px-4 py-8`}>
          <p
            className={`mb-4 border-b-[3px] pb-3 text-center font-heading text-3xl`}
          >
            Adopt A Dog
          </p>
          <div
            className={`flex flex-col gap-4 min-[724px]:flex-row min-[1064px]:flex-col`}
          >
            {animals?.map((animal: AnimalConnectionEdge, index: Key) => {
              const node = animal?.node as Animal;
              return (
                <PetCard
                  key={`${node?.id}-${index}`}
                  variant="sidebar"
                  pet={node}
                />
              );
            })}
          </div>
        </div>
      ) : null}
      {donateWidget ? (
        <div className={`bg-primary-light px-4 py-8`}>
          <p
            className={`mb-6 border-b-[3px] pb-3 text-center font-heading text-3xl`}
          >
            Donate
          </p>
          <DonationForm variant="sidebar" />
        </div>
      ) : null}
    </div>
  );
};

export default Sidebar;
