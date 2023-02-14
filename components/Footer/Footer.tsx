import { Button } from "components/Button";
import { FeaturedImage } from "components/FeaturedImage";
import { NavigationMenu } from "components/NavigationMenu";
import { Socials } from "components/Socials";
import {
  AcfLink,
  Acf_GoogleMap,
  MediaItem,
  MenuItem,
  SeoSocial,
} from "graphql";
import Link from "next/link";
import flatListToHierarchical from "utilities/flatListToHierarchical";

export interface FooterProps {
  logo: MediaItem;
  menuItems: MenuItem[];
  phoneNumber: AcfLink;
  address: Acf_GoogleMap;
  email: AcfLink;
  cta: AcfLink;
  social: SeoSocial;
}

const Footer = ({
  logo,
  menuItems,
  phoneNumber,
  address,
  email,
  cta,
  social,
}: FooterProps) => {
  return (
    <footer className={`bg-primary py-12 px-4 text-gray-100`}>
      <div
        className={`container mx-auto flex flex-col xs:flex-wrap sm:flex-row sm:justify-between`}
      >
        {/* Logo */}
        <div
          className={`flex w-full flex-row flex-wrap items-center justify-center md:w-fit`}
        >
          <div className={`flex flex-col items-center gap-4 sm:items-start`}>
            {/* Logo */}
            {logo ? (
              <FeaturedImage
                image={logo}
                className={`mx-auto mb-4 w-24 md:mx-0 md:mb-8`}
              />
            ) : (
              <a
                href="https://noisytrumpet.com"
                className="title-font mb-4 flex items-center font-medium text-gray-900 md:mb-0"
              >
                {`NT Headless Site Template`}
              </a>
            )}
            {cta ? (
              <Button
                className={`my-4 block sm:hidden lg:ml-4 xl:my-0`}
                variant="secondary"
                href={cta.url ?? ``}
                target={cta.target ?? `_self`}
              >
                {cta.title}
              </Button>
            ) : null}
            {/* Address */}
            {address ? (
              <div className={`flex flex-row items-center`}>
                <a
                  href={`https://www.google.com/maps/place/?q=place_id:${address.placeId}`}
                  target={`_blank`}
                  rel={`noopener noreferrer`}
                  className={`flex flex-row items-center`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23.683"
                    height="35.263"
                    viewBox="0 0 23.683 35.263"
                    className={`mr-2 h-5 w-5`}
                  >
                    <path
                      id="Path_2366"
                      data-name="Path 2366"
                      d="M185.259,17.142A11.848,11.848,0,0,0,173.42,28.975c0,3.8,3.351,9.45,5.564,13.188.335.563.646,1.092.915,1.561l4.842,8.387a.591.591,0,0,0,1.021,0l4.86-8.387c.276-.475.587-1,.927-1.579,2.213-3.727,5.552-9.368,5.552-13.171a11.846,11.846,0,0,0-11.844-11.833Zm0,17.414a5.919,5.919,0,1,1,5.928-5.91A5.919,5.919,0,0,1,185.259,34.557Z"
                      transform="translate(-173.42 -17.142)"
                      fill="#efeff8"
                    />
                  </svg>

                  <span>{address.streetAddress}</span>
                </a>
              </div>
            ) : null}
          </div>
        </div>
        {/* Menu */}
        <div
          className={`mx-auto flex flex-col items-center justify-center py-4 md:flex-row md:justify-end lg:mx-0 xl:justify-start`}
        >
          <NavigationMenu
            type={`footer`}
            menuItems={flatListToHierarchical(menuItems)}
            className={`text-white`}
          />
          <div
            className={`tems-center flex flex-col justify-center xl:h-full xl:justify-around`}
          >
            {cta ? (
              <Button
                className={`my-4 hidden sm:block lg:ml-4 xl:my-0`}
                variant="secondary"
                href={cta.url ?? ``}
                target={cta.target ?? `_self`}
              >
                {cta.title}
              </Button>
            ) : null}
            {/* Socials */}
            <div className={`flex w-full flex-row items-center justify-center`}>
              <Socials socials={social} />
            </div>
          </div>
        </div>
      </div>
      {/* Privacy Policy | Site by */}
      <div
        className={`container mx-auto flex flex-row flex-wrap items-center justify-center py-4 md:items-start md:justify-start`}
      >
        <div
          className={`flex flex-row flex-wrap items-center justify-center md:justify-start`}
        >
          <div className={`flex flex-col`}>
            <div className={`flex flex-row items-center`}>
              <Link
                href={`/privacy-policy/`}
                className={`flex flex-row items-center`}
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
        {/* Separator */}
        <div
          className={`mx-4 flex flex-row flex-wrap items-center justify-center md:justify-start`}
        >
          <div className={`flex flex-col`}>
            <div className={`flex flex-row items-center`}>
              <span className={`flex flex-row items-center`}>|</span>
            </div>
          </div>
        </div>

        <div
          className={`flex flex-row flex-wrap items-center justify-center md:justify-start`}
        >
          <div className={`flex flex-col`}>
            <div className={`flex flex-row items-center`}>
              <a
                href={`https://noisytrumpet.com`}
                target={`_blank`}
                rel={`noopener noreferrer`}
                className={`flex flex-row items-center`}
              >
                Site by Noisy Trumpet
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
