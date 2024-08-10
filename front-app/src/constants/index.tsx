export const MAIN_PATH = () => "/";
export const SIGN_IN_PATH = () => "/sign-in";
export const SIGN_UP_PATH = () => "/sign-up";
export const SEARCH_PATH = (searchWord: string) => `search/${searchWord}`;
export const USER_PATH = (userEmail: string) => `/user/${userEmail}`;
export const BOARD_PATH = () => "/board";
export const BOARD_DETAIL_PATH = (boardNumber: string | number) =>
  `detail/${boardNumber}`;
export const BOARD_WRITE_PATH = () => "write";
export const BOARD_UPDATE_PATH = (boardNumber: string | number) =>
  `update/${boardNumber}`;
