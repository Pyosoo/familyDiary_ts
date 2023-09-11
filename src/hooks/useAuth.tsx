import { RootState } from "@src/store";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

function useAuth() {
    const router = useRouter();
    const isLoginSuccess = useSelector(
        (state: RootState) => state.setting.isLoginSuccess,
    );

    if (!isLoginSuccess) {
        router.push("/login"); // 로그인되지 않았으면 로그인 페이지로 이동
    }
}

export default useAuth;
