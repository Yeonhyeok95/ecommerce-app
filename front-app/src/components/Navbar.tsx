"use client";

import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { FaArrowRight } from "react-icons/fa";
import NavItems from "./NavItems";
import { useEffect, useState } from "react";
import useLoginUserStore from "../hooks/useLoginUserStore";
import { getSignInUserRequest } from "@/apis";
import { GetSignInUserResponseDto } from "@/apis/response/user";
import { ResponseDto } from "@/apis/response";
import User from "@/types/user/user";
import { useLocation, useParams } from "react-router-dom";
import { BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, SEARCH_PATH, SIGN_IN_PATH, SIGN_UP_PATH, USER_PATH } from "@/constants";
import useBoardStore from "@/hooks/useBoardStore";
import { usePathname } from "next/navigation";
import { deleteCookie, getCookie, hasCookie } from "@/hooks/useCustomCookie";
import { useCookies } from "react-cookie";

const Navbar = () => {
  //          state: page          //
  const [isSignPage, setSignPage] = useState<Boolean>(false);
  const [isMainPage, setMainPage] = useState<Boolean>(false);
  const [isSearchPage, setSearchPage] = useState<Boolean>(false);
  const [isBoardDetailPage, setBoardDetailPage] = useState<Boolean>(false);
  const [isBoardWritePage, setBoardWritePage] = useState<Boolean>(false);
  const [isBoardUpdatePage, setBoardUpdatePage] = useState<Boolean>(false);
  const [isUserPage, setUserPage] = useState<Boolean>(false);
  //          state: login user global state          //
  const { loginUser, setLoginUser, resetLoginUser } = useLoginUserStore();
  //          state: path variable          //
  const pathname  = usePathname();
  //          state: login state          //
  const [isLogin, setLogin] = useState<boolean>(false);
  //          state: userEmail path variable state          //
  const { useEmail } = useParams();
  //          state: accessToken cookie          //
  const [cookies, setCookie] = useCookies();
  //          state: board state          //
  const { title, content, boardImageFileList, resetBoard } = useBoardStore();

  //          event handler: sign out Button Click          //
  const onSignOutButtonClickHandler = () => {
    resetLoginUser();
    setCookie("accessToken", "", { path: MAIN_PATH() })
  };
  //          event handler: Upload Button Click          //
  const onUploadButtonClickHandler = () => {

  };

  //          function: get sign in user response          //
  const getSignInUserResponseDto = (responseBody: GetSignInUserResponseDto | ResponseDto | null) => {
    if (!responseBody) {
      console.log("signed user non-existed!");
      return;
    }
    const { code } = responseBody;
    if (code === "AF" || code === "NU" || code === "DBE") {
      resetLoginUser();
      return;
    }
    const loginUser: User = { ...(responseBody as GetSignInUserResponseDto) };
    setLoginUser(loginUser);
  };

  //          effect: whenever accessToken cookie changes          //
  useEffect(() => {
    if (!cookies.accessToken) {
      resetLoginUser();
      return;
    }
    getSignInUserRequest(cookies.accessToken).then(getSignInUserResponseDto);
    
  }, [cookies.accessToken]);
  //          effect: whenever pathname changes          //
  useEffect(() => {

    const isSignPage = pathname.startsWith(SIGN_IN_PATH()) || pathname.startsWith(SIGN_IN_PATH());
    setSignPage(isSignPage);
    const isMainPage = pathname === MAIN_PATH();
    setMainPage(isMainPage);
    const isSearchPage = pathname.startsWith(SEARCH_PATH(""));
    setSearchPage(isSearchPage);
    const isBoardDetailPage = pathname.startsWith(
      BOARD_PATH() + "/" + BOARD_DETAIL_PATH("")
    );
    setBoardDetailPage(isBoardDetailPage);
    const isBoardWritePage = pathname.startsWith(
      BOARD_PATH() + "/" + BOARD_WRITE_PATH()
    );
    setBoardWritePage(isBoardWritePage)
    const isBoardUpdatePage = pathname.startsWith(
      BOARD_PATH() + "/" + BOARD_UPDATE_PATH("")
    );
    setBoardUpdatePage(isBoardUpdatePage);
    const isUserPage = pathname.startsWith(USER_PATH(""));
    setUserPage(isUserPage);
  }, []);
  //          effect: whenever login user changes          //
  useEffect(() => {
    setLogin(loginUser !== null);
  }, [loginUser])

  return (
    <nav className="sticky z-[100] h-20 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-sm transition-all">
      <MaxWidthWrapper>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between">
            <Link href={MAIN_PATH()} className="flex z-40 font-semibold">
              case<span className="text-primary">dolphin</span>
            </Link>
            <div className="h-full flex items-center space-x-1 sm:space-x-4">
              {isLogin ? (
                <>
                  <Link
                    href={MAIN_PATH()}
                    onClick={onSignOutButtonClickHandler}
                    className="px-2 py-1 text-sm sm:px-3 sm:py-3 text-center align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  >
                    Sign Out
                  </Link>
                  {loginUser && (
                    <Link
                      href={USER_PATH(loginUser.email)}
                      className="px-2 py-1 text-sm sm:px-3 sm:py-3 text-center align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      >
                      My Page ✨
                    </Link>
                  )}
                  
                  <div className="h-8 w-px bg-zinc-200 hidden sm:block"></div>

                  <Link
                    href="/configure/upload"
                    className="hidden sm:flex text-sm items-center align-middle gap-1 rounded-lg text-primary-foreground bg-primary px-3 py-1.5 hover:bg-primary/80"
                  >
                    Upload <FaArrowRight className="ml-1.5 h-5 w-5" />
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href={SIGN_UP_PATH()}
                    className="px-2 py-1 text-sm sm:px-3 sm:py-3 text-center align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  >
                    Sign Up
                  </Link>

                  <Link
                    href={SIGN_IN_PATH()}
                    className="px-2 py-1 text-sm sm:px-3 sm:py-3 text-center align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  >
                    Sign In
                  </Link>

                  <div className="h-8 w-px bg-zinc-200 hidden sm:block"></div>

                  <Link
                    href="/configure/upload"
                    className="hidden sm:flex text-sm items-center align-middle gap-1 rounded-lg text-primary-foreground bg-primary px-3 py-1.5 hover:bg-primary/70"
                  >
                    Upload <FaArrowRight className="ml-1.5 h-5 w-5" />
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
