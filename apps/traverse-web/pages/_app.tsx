import "../styles/global.css";
import "../styles/normalize.css";
import "react-reflex/styles.css";

import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
// import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
// import { persistQueryClient } from "@tanstack/react-query-persist-client";
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { initializeAmplitude } from "analytics";
import type { AppProps } from "next/app";
import Head from "next/head";
import { LayoutFn } from "ui";

// TODO: update this
const TITLE = "Traverse Analytics";
const DESCRIPTION = "Easy smart contract analytics for your business decisions";
const IMAGE_URL = "";
const TWITTER_USERNAME = "";

interface MyAppProps extends AppProps<{ dehydratedState: DehydratedState }> {
  Component: LayoutFn<{ dehydratedState: DehydratedState }>;
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

initializeAmplitude();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

// if (typeof window !== "undefined") {
//   const localStoragePersister = createSyncStoragePersister({
//     storage: window.localStorage,
//   });
//
//   persistQueryClient({
//     queryClient,
//     persister: localStoragePersister,
//     buster: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
//   });
// }

function MyApp({ Component, pageProps }: MyAppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={IMAGE_URL} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={TWITTER_USERNAME} />
        <meta property="twitter:title" content={TITLE} />
        <meta property="twitter:description" content={DESCRIPTION} />
        <meta property="twitter:image" content={IMAGE_URL} />
      </Head>
      <ThemeProvider theme={darkTheme}>
        <StyledEngineProvider injectFirst>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              {/* @ts-ignore */}
              {getLayout(<Component {...pageProps} />)}
            </Hydrate>
          </QueryClientProvider>
        </StyledEngineProvider>
      </ThemeProvider>
    </div>
  );
}

export default MyApp;
