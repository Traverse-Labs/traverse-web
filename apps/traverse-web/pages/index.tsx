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
        <div className="flex w-full flex-col justify-center space-y-6 px-8 lg:w-1/2 lg:px-2">
          <div className="text-neon text-center text-7xl font-bold lg:text-left">
            Traverse Analytics
          </div>
          <div className="text-center text-2xl lg:text-left">
            Super simple self-service smart contract analytics platform for your
            business decisions on Solana
          </div>
          <TextInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Register with your email address..."
            classname="bg-slate-800"
          />
          <div className="flex flex-col items-center gap-2 lg:flex-row">
            <div>Select a project to explore</div>
            <DropdownSelect
              value={programAddress}
              options={SupportedContractOptions}
              onChange={handleContractAddressChange}
              isChevronIconShown
            />
          </div>
          <div className="flex w-full justify-center lg:justify-start">
            <Button
              variant="primary"
              classname="w-fit text-base background-neon"
              onClick={handleButtonClick}
            >
              {isLoading ? <LoadingSpinner /> : <div>Get Started</div>}
            </Button>
          </div>
        </div>
        <div className="relative flex hidden flex-1 -scale-x-100 transform lg:block">
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
