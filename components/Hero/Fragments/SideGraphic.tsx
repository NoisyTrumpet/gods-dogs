// import dynamic from "next/dynamic";

import BasicGraphic from "public/hero-assets/paw-hero-asset.svg";
import DogGroup1 from "public/hero-assets/dog-group-1.svg";
import DogGroup2 from "public/hero-assets/dog-group-2.svg";
import AfghanHound from "public/hero-assets/afghan-hound.svg";
import Dalmatian from "public/hero-assets/dalmatian.svg";
import EnglishSheepdog from "public/hero-assets/english-sheepdog.svg";
import GoldenPittie from "public/hero-assets/golden-pittie.svg";
import HoundDash from "public/hero-assets/hound-dachshund.svg";
import HoundFrenchie from "public/hero-assets/hound-frenchie.svg";
import PittieTerrier from "public/hero-assets/pittie-terrier.svg";
import Poodle from "public/hero-assets/poodle.svg";
import ShihTzuChi from "public/hero-assets/shih-tzu-chihuahua.svg";
import VolunteerWalker from "public/hero-assets/volunteer-walker.svg";


export interface SlideGraphicProps {
    graphic?: string;
    className?: string;
}

const SideGraphic = ({graphic, className}: SlideGraphicProps) => {
  switch(graphic) {
    case "goldenGroup": {
        return <DogGroup1 className={`relative right-[150px] ${className ? className : ""}`}  />;
    }
    case "terrierGroup": {
        return <DogGroup2 className={className ? className : ""} />;
    }
    case "afghanHound": {
        return <AfghanHound className={className ? className : ""} />;
    }
    case "dalmatian": {
        return <Dalmatian className={className ? className : ""} />;
    }
    case "englishSheepdog": {
        return <EnglishSheepdog className={className ? className : ""} />;
    }
    case "goldenPittie": {
        return <GoldenPittie className={className ? className : ""} />;
    }
    case "houndDash": {
        return <HoundDash className={className ? className : ""} />;
    }
    case "houndFrenchie": {
        return <HoundFrenchie className={className ? className : ""} />;
    }
    case "pittieTerrier": {
        return <PittieTerrier className={className ? className : ""} />;
    }
    case "poodle": {
        return <Poodle className={className ? className : ""} />;
    }
    case "shihTzuChi": {
        return <ShihTzuChi className={className ? className : ""} />;
    }
    case "volunteerWalker": {
        return <VolunteerWalker className={className ? className : ""} />;
    }
    default: {
        return <BasicGraphic className={className ? className : ""} />;
    }
  }
};

export default SideGraphic;