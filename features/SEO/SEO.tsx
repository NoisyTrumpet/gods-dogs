import { PostTypeSeo } from "graphql";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

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

  const origin = process.env.NODE_ENV === "development" ? "http://localhost:3000/" : process.env.NEXT_PUBLIC_VERCEL_URL;


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
            url: `${origin}api/og/?title=${title}`,
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
