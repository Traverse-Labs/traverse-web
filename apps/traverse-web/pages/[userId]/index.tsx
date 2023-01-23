import { DehydratedStateProps, NextPageWithLayout } from "ui";

import { useUserContext } from "../../src/contexts/UserContext";
import { getPageLayout } from "../../src/layouts/Layout";

const DashboardPage: NextPageWithLayout<DehydratedStateProps> = () => {
  const { projectName } = useUserContext();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-neon mb-4 text-4xl font-bold">{projectName}</div>
      <div className="mb-4 text-2xl font-bold">Dashboard</div>
    </div>
  );
};

DashboardPage.getLayout = getPageLayout;

export default DashboardPage;
