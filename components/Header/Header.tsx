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
  isMobile?: boolean;
}

const SiteLogo = ({ isScrolled, logo, logoAlt }: SiteLogoProps) => {
  if (isScrolled) {
    return (
      <Link href="/">
        {logoAlt ? <FeaturedImage image={logoAlt} className={`h-16`} /> : null}
      </Link>
    );
  }
  return (
    <Link href="/">
      {logo ? (
        <FeaturedImage image={logo} className={`hidden h-24 md:flex`} />
      ) : null}
      {logoAlt ? (
        <FeaturedImage image={logoAlt} className={`flex h-16 md:hidden`} />
      ) : null}
    </Link>
  );
};

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
      <div className="container mx-auto flex w-full flex-row flex-wrap justify-between md:items-center md:p-4">
        <div
          className={`flex flex-row flex-wrap items-center justify-center py-4 pl-4 md:justify-start md:py-0 md:pl-0`}
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
        <div
          className={`flex flex-row flex-wrap items-center justify-center gap-4 md:w-auto`}
        >
          {/* Navigation Menu */}
          <NavigationMenu
            menuItems={flatListToHierarchical(menuItems)}
            isOpen={open}
            type="secondary"
            toggleOpen={() => cycleOpen()}
            className={`order-last md:order-1`}
          />
          {cta ? (
            <Button
              type={`secondary`}
              href={cta.url ?? ``}
              className={`order-first w-fit md:order-last`}
            >
              {cta.title}
            </Button>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
