import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const handleRouteChange = (url) => {
    window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
      page_path: url,
      cookie_flags: "SameSite=None;Secure",
    });
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      <Head>
        <title>Wut Floor</title>
        <meta property="og:title" content="Wut Floor" key="title" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
        <link rel="preload" rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />

      </Head>
      <NextSeo
        openGraph={{
          type: "Wut Floor",
          url: "https://wutfloor.xyz",
          title: "Wut Floor",
          description:
            "Save 🧠 power and stop calculating your portfolio manually!",
          images: [
            {
              url: "https://wutfloor.xyz/img/logo.png",
              width: 800,
              height: 600,
              alt: "Wut Floor Logo",
            },
          ],
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
