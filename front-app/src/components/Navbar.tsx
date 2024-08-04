import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import NavItems from "./NavItems";

const Navbar = () => {
  const user = undefined;
  const isAdmin = false;

  return (
    <nav className="sticky z-[100] h-20 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-sm transition-all">
      <MaxWidthWrapper>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex z-40 font-semibold">
              case<span className="text-primary">dolphin</span>
            </Link>

            <div className="h-full flex items-center space-x-1 sm:space-x-4">
              {user ? (
                <>
                  <Link
                    href="/api/auth/logout"
                    className="px-2 py-1 text-sm sm:px-3 sm:py-3 text-center align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  >
                    Log Out
                  </Link>
                  {isAdmin ? (
                    <Link
                      href="/dashboard"
                      className="px-2 py-1 text-sm sm:px-3 sm:py-3 text-center align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    >
                      Dashboard ✨
                    </Link>
                  ) : null}

                  <div className="h-8 w-px bg-zinc-200 hidden sm:block"></div>

                  <Link
                    href="/configure/upload"
                    className="hidden sm:flex text-sm items-center align-middle gap-1 rounded-lg text-primary-foreground bg-primary px-3 py-1.5 hover:bg-primary/80"
                  >
                    Create case <FaArrowRight className="ml-1.5 h-5 w-5" />
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/sign-up"
                    className="px-2 py-1 text-sm sm:px-6 sm:py-3 text-center align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  >
                    Sign Up
                  </Link>

                  <Link
                    href="/sign-in"
                    className="px-2 py-1 text-sm sm:px-6 sm:py-3 text-center align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  >
                    Login
                  </Link>

                  <div className="h-8 w-px bg-zinc-200 hidden sm:block"></div>

                  <Link
                    href="/configure/upload"
                    className="hidden sm:flex text-sm items-center align-middle gap-1 rounded-lg text-primary-foreground bg-primary px-3 py-1.5 hover:bg-primary/70"
                  >
                    Create case <FaArrowRight className="ml-1.5 h-5 w-5" />
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between flex-grow">
            <div className="flex items-center gap-5 h-full">
              <NavItems />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};



export default Navbar;
