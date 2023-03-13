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
    <div className={`p-4 flex flex-col gap-4`}>
      {dogsWidget ? (
        <div className={`px-4 py-8 bg-primary-light`}>
          <p className={`text-3xl font-heading text-center pb-3 mb-6 border-b-[3px]`}>Adopt A Dog</p>
          {animals?.map(
        (animal: AnimalConnectionEdge, index: Key) => {
          const node = animal?.node as Animal;
          return (
            <PetCard
              key={`${node?.id}-${index}`}
              variant="basic"
              pet={node}
            />
          );
        }
      )}
        </div>
      ) : null}
      {donateWidget ? (
        <div className={`px-4 py-8 bg-primary-light`}>
          <p className={`text-3xl font-heading text-center pb-3 mb-6 border-b-[3px]`}>Donate</p>
          <DonationForm variant="sidebar" /> 
        </div>
      ): null}
    </div>
  );
};

export default Sidebar;
