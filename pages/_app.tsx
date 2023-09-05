import wrapper from "src/store";
import { Provider, useDispatch } from "react-redux";
import { createGlobalStyle } from "styled-components";
import { AppProps } from "next/app";
import Login from "./login";
import { useEffect } from "react";
import CustomSnackbar from "@src/customComponent/CustomSnackbar";

function MyApp({ Component, pageProps }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(pageProps);

    return (
        <Provider store={store}>
            <CustomSnackbar />
            <Component {...props} /> {/* index.tsx*/}
            <Login />
        </Provider>
    );
}
export default MyApp;
