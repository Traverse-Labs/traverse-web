import "../styles/global.css";
import "../styles/normalize.css";
import "react-reflex/styles.css";

import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { initializeAmplitude } from "analytics";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";
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

function MyApp({ Component, pageProps }: MyAppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

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
