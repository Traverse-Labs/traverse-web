import Document, { Head, Html, Main, NextScript } from "next/document";
import * as React from "react";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="h-full bg-slate-900">
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content="#0f172a" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
            rel="stylesheet"
          />
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        </Head>
        <body className="fixed-body">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
