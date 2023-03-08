import { Button } from "components/Button";
import { FeaturedImage } from "components/FeaturedImage";
import Link from "next/link";

export interface SidebarProps {
  dogsWidget: boolean;
  donateWidget: boolean;
}

const Sidebar = ({ donateWidget, dogsWidget }: SidebarProps) => {
  return (
    <div className={`p-4`}>
      <p className={`pb-4 text-xl`}>Sidebar</p>
      {dogsWidget ? <div>dogs</div> : null}
      {donateWidget ? <div>donate</div> : null}
    </div>
  );
};

export default Sidebar;
