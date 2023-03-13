import {
  AcfLink,
  Acf_GoogleMap,
  AcfFieldGroup,
  MediaItem,
  MenuItem,
  PostTypeSeo,
  RootQueryToMenuItemConnection,
  SeoSocial,
  RootQueryToAnimalConnectionEdge,
} from "graphql";
import { Main, SEO } from "features";

import { Header, Footer, Sidebar } from "components";

export interface LayoutProps {
  children: React.ReactNode;
  headerMenuItems: RootQueryToMenuItemConnection;
  footerMenuItems: RootQueryToMenuItemConnection;
  title: string;
  description: string;
  logo: MediaItem;
  logoAlt: MediaItem;
  logoWhite: MediaItem;
  seo: PostTypeSeo;
  cta: AcfLink;
  phoneNumber: AcfLink;
  address: Acf_GoogleMap;
  email: AcfLink;
  twitterUser: string;
  social: SeoSocial;
  turnOnAnnouncements: boolean;
  announcements: any[];
  useSidebar: boolean;
  donateWidget: boolean;
  dogsWidget: boolean;
  animals: RootQueryToAnimalConnectionEdge[];
}

const Layout = ({
  children,
  headerMenuItems,
  footerMenuItems,
  cta,
  title,
  description,
  seo,
  logo,
  logoAlt,
  logoWhite,
  phoneNumber,
  address,
  email,
  twitterUser,
  social,
  turnOnAnnouncements,
  announcements,
  useSidebar,
  donateWidget,
  dogsWidget,
  animals,
}: LayoutProps) => {
  return (
    <>
      {seo ? <SEO seo={seo} twitter={twitterUser} /> : null}
      <Header
        menuItems={headerMenuItems.nodes}
        logo={logo}
        logoAlt={logoAlt}
        cta={cta}
        turnOnAnnouncements={turnOnAnnouncements}
        announcements={announcements}
      />
      {useSidebar ? (
        <Main className={`main flex flex-col md:flex-row`}>
          <div className={`w-full md:w-3/4`}>{children}</div>
          <div className={`w-full md:w-1/4`}>
            <Sidebar animals={animals} dogsWidget={dogsWidget} donateWidget={donateWidget} />
          </div>
        </Main>
      ) : (
        <Main className={`main`}>{children}</Main>
      )}
      {/* <Main className={`main`}>{children}</Main> */}
      <Footer
        menuItems={footerMenuItems.nodes}
        cta={cta}
        phoneNumber={phoneNumber}
        logo={logoWhite}
        address={address}
        email={email}
        social={social}
      />
    </>
  );
};

export default Layout;
