import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  Button,
  DehydratedStateProps,
  DropdownSelect,
  LoadingSpinner,
  NextPageWithLayout,
  TextInput,
} from "ui";
import { Option } from "ui/types/Option.type";

import { useCreateUserMutation } from "../src/api/User.queries";
import CatIllustration from "../src/assets/pngs/cat-illustration.png";
import { SupportedContractOptions, USER_ID_LS_KEY } from "../src/constants";
import { getPageLayout } from "../src/layouts/Layout";
import { User } from "../src/types/User.type";

const Home: NextPageWithLayout<DehydratedStateProps> = () => {
  const [email, setEmail] = useState("");
  const [programAddress, setProgramAddress] = useState<string>("");

  const router = useRouter();

  const handleSuccessCallback = (user: User) => {
    if (user.id) {
      localStorage.setItem(USER_ID_LS_KEY, user.id);
      router.push(`/${user.id}`);
    }
  };

  const { mutate: createNewUser, isLoading } = useCreateUserMutation(
    handleSuccessCallback
  );

  const handleContractAddressChange = (option: Option<string>) => {
    setProgramAddress(option.value);
  };

  const handleButtonClick = async () => {
    createNewUser({ email, programAddress });
  };

  return (
    <div className="flex h-full flex-1">
      <div className="flex h-full w-full flex-row gap-28">
        <div className="flex w-1/2 flex-col justify-center space-y-6">
          <div className="text-neon text-7xl font-bold">Traverse Analytics</div>
          <div className="text-2xl">
            Super simple self-service smart contract analytics platform for your
            business decisions on Solana
          </div>
          <TextInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Register with your email address..."
          />
          <div className="flex items-center gap-2">
            <div>Select a project to explore</div>
            <DropdownSelect
              value={programAddress}
              options={SupportedContractOptions}
              onChange={handleContractAddressChange}
              isChevronIconShown
            />
          </div>
          <Button
            variant="primary"
            classname="w-fit"
            onClick={handleButtonClick}
          >
            {isLoading ? <LoadingSpinner /> : <div>Get Started</div>}
          </Button>
        </div>
        <div className="relative flex flex-1 -scale-x-100 transform">
          <Image
            layout="fill"
            objectFit="contain"
            src={CatIllustration}
            alt=""
            priority
          />
        </div>
      </div>
    </div>
  );
};

Home.getLayout = getPageLayout;

export default Home;
