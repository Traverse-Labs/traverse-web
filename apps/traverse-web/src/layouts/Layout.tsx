import { Dialog, Transition } from "@headlessui/react";
import { Bars3BottomLeftIcon } from "@heroicons/react/20/solid";
import { ChartBarIcon, HomeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, ReactElement, ReactNode, useState } from "react";
import { LogoImg } from "ui";

import DexScanLogo from "../assets/pngs/logos/dex-scan-logo.png";
import { useUserContext } from "../contexts/UserContext";

type Props = {
  children: ReactNode;
};

const navigation = [
  { name: "Dashboard", href: `/`, pathname: "/[userId]", icon: HomeIcon },
  {
    name: "Charts",
    href: `/chart`,
    pathname: "/[userId]/chart",
    icon: ChartBarIcon,
  },
];

const Layout = (props: Props) => {
  const { children } = props;

  const { userId } = useUserContext();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const router = useRouter();

  const logo = (
    <div className="flex w-full items-center justify-between md:justify-start md:gap-1">
      <LogoImg
        alt="DexScan Logo"
        src={DexScanLogo}
        size="xl"
        className="md:ml-1 md:h-9 md:w-9"
      />
    </div>
  );

  const getNavMenuItems = () =>
    navigation.map((item) => {
      const navMenu = (
        <div
          className={clsx(
            router.pathname === item.pathname
              ? "bg-slate-100 text-slate-900"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
            "group mb-3 flex cursor-pointer items-center rounded-md px-2 py-2 text-sm font-medium transition"
          )}
          onClick={() => setSidebarOpen(false)}
        >
          <item.icon
            className={clsx(
              router.pathname === item.pathname
                ? "text-slate-500"
                : "text-slate-400 group-hover:text-slate-500",
              "mr-4 h-6 w-6 flex-shrink-0 "
            )}
            aria-hidden="true"
          />
          <div className="truncate">{item.name}</div>
        </div>
      );

      return (
        <Link key={item.name} href={`/${userId}${item.href}`}>
          {navMenu}
        </Link>
      );
    });

  const mobileSideBar = (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 md:hidden"
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-600 bg-opacity-20 backdrop-blur" />
        </Transition.Child>
        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-slate-900 pt-5 pb-4">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 shadow focus:outline-none focus:ring-1 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex w-full flex-shrink-0 items-center px-4 text-slate-50">
                {logo}
              </div>
              <div className="mt-5 h-0 flex-1 overflow-y-auto">
                <nav className="px-2">{getNavMenuItems()}</nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
          <div className="w-14 flex-shrink-0 transition" aria-hidden="true" />
        </div>
      </Dialog>
    </Transition.Root>
  );

  const mobileSideBarToggle = (
    <div className="sticky top-0 z-10 flex flex h-11 flex-shrink-0 items-center gap-4 md:hidden md:h-14">
      <button
        type="button"
        className="h-full px-3 text-slate-500 focus:outline-none md:px-4"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3BottomLeftIcon className="h-6 md:w-6" aria-hidden="true" />
      </button>
      <div className="text-base text-slate-400">Traverse Analytics</div>
    </div>
  );

  const desktopSideBar = (
    <div className="z-20 hidden transition-all md:fixed md:absolute md:inset-y-0 md:flex md:w-14 md:flex-col hover:md:w-52">
      <div className="flex flex-grow flex-col overflow-y-auto border-r border-slate-800 bg-slate-900 pt-3 md:overflow-x-hidden md:pt-2">
        <div className="flex w-52 flex-shrink-0 items-center px-2 text-slate-50">
          {logo}
        </div>
        <div className="mt-4 flex flex-grow flex-col">
          <nav className="flex-1 px-2 pb-4">{getNavMenuItems()}</nav>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed-body custom-background-color text-slate-50">
      {mobileSideBar}
      {desktopSideBar}
      <div className="flex h-full flex-1 flex-col md:pl-14">
        {mobileSideBarToggle}
        <main className="flex-1 overflow-auto py-8">{children}</main>
      </div>
    </div>
  );
};

export const getPageLayout = (page: ReactElement) => <Layout>{page}</Layout>;
