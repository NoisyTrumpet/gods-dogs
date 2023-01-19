import { Button } from "components/Button";
import { FeaturedImage } from "components/FeaturedImage";
import { NavigationMenu } from "components/NavigationMenu";
import { useCycle, useScroll } from "framer-motion";
import { AcfLink, MediaItem, MenuItem } from "graphql";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import flatListToHierarchical from "utilities/flatListToHierarchical";

export interface HeaderProps {
  menuItems: MenuItem[];
  logo: MediaItem;
  logoAlt: MediaItem;
  cta: AcfLink;
}

export interface SiteLogoProps {
  isScrolled: boolean;
  logo: MediaItem;
  logoAlt: MediaItem;
}

const SiteLogo = ({isScrolled, logo, logoAlt}: SiteLogoProps) => {
  if( isScrolled ) {
    return <FeaturedImage image={logoAlt} className={`mb-4 h-24 md:mb-0`} />;
  }
  return <FeaturedImage image={logo} className={`mb-4 h-24 md:mb-0`} />;
}

const Header = ({ menuItems, logo, logoAlt, cta }: HeaderProps) => {
  const [open, cycleOpen] = useCycle(false, true);
  const ref = useRef(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const [isScrolledPast, setIsScrolledPast] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      // If latest is greater than height of header, set isScrolledPast to true
      if (latest > 0) {
        setIsScrolledPast(true);
      } else {
        setIsScrolledPast(false);
      }
    });
  }, [scrollY]);

  return (
    <header
      className={`${
        isScrolledPast ? `shadow-md` : ``
      } body-font sticky top-0 z-30 max-h-fit bg-white text-gray-600 transition-shadow`}
      ref={ref}
    >
      <div className="container mx-auto flex flex-row flex-wrap items-center justify-center p-4 md:justify-between">
        <div
          className={`flex flex-row flex-wrap items-center justify-center md:justify-start`}
        >
          {/* Logo */}
          {logo ? (
            <SiteLogo
              isScrolled={isScrolledPast}
              logo={logo}
              logoAlt={logoAlt}
            />
          ) : (
            <Link
              href="/"
              className="title-font mb-4 flex items-center font-medium text-gray-900 md:mb-0"
            >
              {`God's Dogs`}
            </Link>
          )}
        </div>
        {/* CTA */}
        <div className={`flex flex-row flex-wrap items-center justify-center`}>
          {/* Navigation Menu */}
          <NavigationMenu
            menuItems={flatListToHierarchical(menuItems)}
            isOpen={open}
            type="secondary"
            toggleOpen={() => cycleOpen()}
          />
          {cta ? (
            <Button type={`secondary`} className={`ml-4`} href={cta.url ?? ``}>
              {cta.title}
            </Button>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
