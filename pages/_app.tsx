import wrapper from "../store";
import { Provider } from "react-redux";
import { createGlobalStyle } from "styled-components";
import { Login } from "./login/login";

function MyApp({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <Component {...props} /> {/* index.tsx*/}
      <Login />
    </Provider>
  );
}
export default MyApp;
