import wrapper, { RootState } from "src/store";
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import CustomSnackbar from "@src/customComponent/CustomSnackbar";
import Layout from "@src/customComponent/Layout";
import "../styles/style.css";

function MyApp({ Component, pageProps }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(pageProps);
    return (
        <Provider store={store}>
            <CustomSnackbar />
            <Layout {...props} />
        </Provider>
    );
}
export default MyApp;
