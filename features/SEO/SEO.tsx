import { PostTypeSeo } from "graphql";
import { NextSeo } from "next-seo";

export interface SEOProps {
  seo: PostTypeSeo;
  twitter: string;
}

const SEO = ({ seo, twitter }: SEOProps) => {
  const {
    title,
    metaDesc,
    canonical,
    metaRobotsNoindex,
    metaRobotsNofollow,
    opengraphTitle,
    opengraphSiteName,
  } = seo;
  const url = typeof window !== "undefined" ? window.location.href : "";

  return (
    <NextSeo
      title={title ?? `God's Dogs`}
      description={metaDesc ?? ``}
      canonical={canonical ?? ``}
      openGraph={{
        url: canonical ?? ``,
        title: opengraphTitle ?? `God's Dogs`,
        description: metaDesc ?? ``,
        images: [
          {
            url: `${url}api/og/?title=${title ?? `God's Dogs`}${
              metaDesc ? `&description=${metaDesc}` : ``
            }`,
            width: 1200,
            height: 630,
            alt: `God's Dogs`,
            type: `image/png`,
          },
        ],
        siteName: opengraphSiteName ?? `God's Dogs`,
      }}
      twitter={{
        handle: twitter ?? `@GodsDogs`,
        site: twitter ?? `@GodsDogs`,
        cardType: `summary_large_image`,
      }}
    />
  );
};

export default SEO;
