import { PostTypeSeo } from "graphql";
import { NextSeo } from "next-seo";
import Head from "next/head";

export interface SEOProps {
  seo: PostTypeSeo;
  twitter: string;
}

export default function SEO({ seo, twitter }: SEOProps) {
  const {
    title,
    metaDesc,
    canonical,
    metaRobotsNoindex,
    metaRobotsNofollow,
    opengraphTitle,
    opengraphSiteName,
  } = seo;

  if (!title && !metaDesc) {
    return null;
  }

  const url = process.env.NODE_ENV === "production"
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3000";

    const og = new URL(`${url}/api/og/?title=${title}${
      metaDesc ? `&description=${metaDesc}` : ""
    }`)

  return (
    <NextSeo
      title={title ?? `God's Dogs`}
      description={metaDesc ?? ``}
      canonical={canonical ?? ``}
      openGraph={{
        url: canonical ?? ``,
        title: opengraphTitle ?? `God's Dogs`,
        description: metaDesc ?? ``,
        siteName: opengraphSiteName ?? `God's Dogs`,
        images: [
          {
            url: og.href,
            width: 1200,
            height: 627,
            alt: metaDesc ? metaDesc : ``,
          },
        ],
      }}
      twitter={{
        handle: twitter ?? `@GodsDogs`,
        site: twitter ?? `@GodsDogs`,
        cardType: `summary_large_image`,
      }}
    />
  );
}
