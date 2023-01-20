import "../faust.config.js";
import "styles/globals.css";
import { GTM_ID, gtmVirtualPageView } from "lib/gtm";
import type { AppProps } from "next/app";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { FaustProvider } from "@faustwp/core";
import Script from "next/script";
import { DefaultSeo } from "next-seo";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { asPath: path } = router || {
    asPath: "",
  };
  useEffect(() => {
    const mainDataLayer = {
      pageTypeName: pageProps.page || null,
      url: router.pathname,
    };

    gtmVirtualPageView(mainDataLayer);
  }, [pageProps, router.pathname]);

  const { __TEMPLATE_QUERY_DATA__ } = pageProps;
  const { seo, page } = __TEMPLATE_QUERY_DATA__;
  const { social, schema } = seo;
  const { companyName } = schema;

  const hasSEO = __TEMPLATE_QUERY_DATA__ && seo && seo.title && seo.metaDesc;

  return (
    <FaustProvider pageProps={pageProps}>
      {hasSEO ? (
        <DefaultSeo
        openGraph={{
          type: "website",
          locale: "en_US",
          url: page.seo.canonical,
          site_name: companyName,
        }}
        twitter={{
          handle: social.twitter.username,
          site: social.twitter.username,
          cardType: "summary_large_image",
        }}
      />
      ) : null}
      <Script
        id="gtag-base"
        strategy="worker"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${GTM_ID}');
          `,
        }}
      />
      <Component {...pageProps} key={path} />
    </FaustProvider>
  );
}
