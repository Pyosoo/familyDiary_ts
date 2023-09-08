import { PersistGate } from "redux-persist/integration/react";
import wrapper, { RootState, ExtendedStore } from "src/store";
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import CustomSnackbar from "@src/customComponent/CustomSnackbar";
import Layout from "@src/customComponent/Layout";
import "../styles/style.css";

function MyApp({ Component, pageProps }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(pageProps) as {
        store: ExtendedStore;
        props: any;
    };

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={store.__persistor}>
                <CustomSnackbar />
                <Layout {...props} />
            </PersistGate>
        </Provider>
    );
}

export default MyApp;
