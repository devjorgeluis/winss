import { createContext } from "react";

export const LayoutContext = createContext({
    isLogin: false,
    userBalance: "",
    handleLogoutClick: () => { },
    handleChangePasswordClick: () => { },
    refreshBalance: () => { },
});