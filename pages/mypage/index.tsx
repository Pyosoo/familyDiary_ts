import MyPage from "@src/Containers/MyPage";
import useAuth from "@src/hooks/useAuth";
import React from "react";

export default function Page() {
    useAuth();

    return (
        <>
            <MyPage />
        </>
    );
}
