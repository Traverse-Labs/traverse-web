import { DehydratedStateProps, NextPageWithLayout } from "ui";

import { getPageLayout } from "../src/layouts/Layout";

const Home: NextPageWithLayout<DehydratedStateProps> = () => {
  return <div className="flex h-full flex-1 flex-col">test</div>;
};

Home.getLayout = getPageLayout;

export default Home;
