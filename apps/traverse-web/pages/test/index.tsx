import { getPageLayout } from "../../src/layouts/Layout";

const Test = () => {
  return <div>test</div>;
};

Test.getLayout = getPageLayout;

export default Test;
