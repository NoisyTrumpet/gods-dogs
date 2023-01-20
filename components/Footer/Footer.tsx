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
    <footer className={`bg-primary text-gray-100 py-12`}>
      <div
        className={`container mx-auto flex flex-col flex-wrap md:flex-row md:justify-between`}
      >
        {/* Logo */}
        <div
          className={`flex flex-row flex-wrap items-center justify-center md:justify-start`}
        >
          <div className={`flex flex-col gap-4`}>
            {/* Logo */}
            {logo ? (
              <FeaturedImage image={logo} className={`mb-4 w-24 md:mb-12`} />
            ) : (
              <a
                href="https://noisytrumpet.com"
                className="title-font mb-4 flex items-center font-medium text-gray-900 md:mb-0"
              >
                {`NT Headless Site Template`}
              </a>
            )}
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
            {/* Phone Number */}
            {phoneNumber ? (
              <div className={`flex flex-row items-center`}>
                <a
                  href={`tel:${phoneNumber.url}`}
                  className={`flex flex-row items-center`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="27.913"
                    height="27.914"
                    viewBox="0 0 27.913 27.914"
                    className={`mr-2 h-5 w-5`}
                  >
                    <path
                      id="Path_2367"
                      data-name="Path 2367"
                      d="M125.21,48.72l-6.089-3.759a1.548,1.548,0,0,0-.815-.227,1.6,1.6,0,0,0-1.234.575l-1.182,1.457a1.209,1.209,0,0,1-1.016.486c-.816,0-2.345-.557-5-3.209-2.727-2.727-3.249-4.27-3.206-5.085a1.2,1.2,0,0,1,.484-.929l1.457-1.181a1.6,1.6,0,0,0,.348-2.049L105.2,28.712A1.563,1.563,0,0,0,103.89,28a1.416,1.416,0,0,0-.437.068l-1.918.619c-1.549.5-2.671,2.434-3.2,4.076-1.279,3.944,1.238,9.108,7.479,15.348,5.178,5.178,9.641,7.8,13.266,7.8a6.638,6.638,0,0,0,2.081-.325c1.642-.533,3.574-1.654,4.076-3.2l.619-1.918a1.548,1.548,0,0,0-.643-1.748Z"
                      transform="translate(-98.008 -28)"
                      fill="#efeff8"
                    />
                  </svg>
                  <span>{phoneNumber.title}</span>
                </a>
              </div>
            ) : null}
          </div>
        </div>
        {/* Menu */}
        <div
          className={`flex flex-row flex-wrap items-center justify-center md:justify-start`}
        >
          <NavigationMenu
            type={`footer`}
            menuItems={flatListToHierarchical(menuItems)}
            className={`text-white`}
          />
          <div className={`flex flex-col items-center h-full justify-around`}>
            {cta ? (
              <Button className={`ml-4`} type="secondary" href={cta.url ?? ``}>
                {cta.title}
              </Button>
            ) : null}
            {/* Socials */}
            <Socials socials={social} />
          </div>
        </div>
      </div>
      {/* Privacy Policy | Site by */}
      <div
        className={`container mx-auto flex flex-col flex-wrap py-4 md:flex-row`}
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
