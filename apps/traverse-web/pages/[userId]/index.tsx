import { DehydratedStateProps, NextPageWithLayout } from "ui";

import { getPageLayout } from "../../src/layouts/Layout";

const DashboardPage: NextPageWithLayout<DehydratedStateProps> = () => {
  return (
    <div className="flex h-full flex-1 flex-col">Project Dashboard Page</div>
  );
};

DashboardPage.getLayout = getPageLayout;

export default DashboardPage;
