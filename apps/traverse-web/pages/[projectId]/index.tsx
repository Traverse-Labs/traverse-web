import { DehydratedStateProps, NextPageWithLayout } from "ui";

import { getPageLayout } from "../../src/layouts/Layout";

const ProjectPage: NextPageWithLayout<DehydratedStateProps> = () => {
  return (
    <div className="flex h-full flex-1 flex-col">Project Dashboard Page</div>
  );
};

ProjectPage.getLayout = getPageLayout;

export default ProjectPage;
