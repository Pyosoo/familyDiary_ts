import { PersistGate } from "redux-persist/integration/react";
import wrapper, { RootState } from "src/store"; // ExtendedStore 참조 제거
import { useSelector } from "react-redux";
import { AppProps } from "next/app";
import CustomSnackbar from "@src/customComponent/CustomSnackbar";
import Layout from "@src/customComponent/Layout";
import "../styles/style.css";
import Login from "@src/Containers/Login";
import "react-calendar/dist/Calendar.css";
import DiaryModal from "@src/customComponent/DiaryModal";

function MyApp({ Component, pageProps }: AppProps) {
    const { store } = wrapper.useWrappedStore(pageProps);

    const isLoginSuccess = useSelector(
        (state: RootState) => state.setting.isLoginSuccess,
    );
    console.log(store);
    return (
        <PersistGate loading={null} persistor={store.__persistor}>
            <CustomSnackbar />
            <DiaryModal />
            {isLoginSuccess ? (
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            ) : (
                <Login />
            )}
        </PersistGate>

        // <div>test</div>
    );
}

export default wrapper.withRedux(MyApp);
