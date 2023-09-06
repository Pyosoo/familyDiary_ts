import React from "react";
import { useSelector } from "react-redux";
import Login from "@src/Containers/Login";
import { RootState } from "@src/store";

function Layout() {
    const isLoginSuccess = useSelector(
        (state: RootState) => state.setting.isLoginSuccess,
    );
    return (
        <div>
            <Login />
        </div>
    );
}

export default Layout;
