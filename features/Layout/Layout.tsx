import {
  AcfLink,
  Acf_GoogleMap,
  AcfFieldGroup,
  MediaItem,
  MenuItem,
  PostTypeSeo,
  RootQueryToMenuItemConnection,
  SeoSocial,
} from "graphql";
import { Main, SEO } from "features";

import { Header, Footer } from "components";

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
      <Main className={`main`}>{children}</Main>
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
