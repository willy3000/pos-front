import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "@/store";
import { useEffect, useState } from "react";
import { fetchUser } from "../slices/user";
import { useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import "react-toastify/dist/ReactToastify.css";
// import ToastContainer from "@/components/hocs/toast";
// import BetaToast from "@/components/hocs/beta-toast";
import { useSelector } from "react-redux";
import useUserActivityTracker from "@/hooks/useUserActivityTracker";
import { useMounted } from "@/hooks/useMounted";

export default function App({ Component, pageProps }) {
  let persistor = persistStore(store);

  const isMounted = useMounted();

  const settings = store.getState().settings.settings;

  const theme = createTheme({
    palette: {
      primary: {
        main: settings?.theme.primary ?? "#FFCA55",
      },
      secondary: {
        main: settings?.theme.secondary ?? "#FFCA55",
      },
    },
  });

  const getLayout = Component.getLayout ?? ((page) => page);

  const runHook = () => {
    try {
      useUserActivityTracker();
    } catch (err) {}
  };

  useEffect(() => {
    setTimeout(() => {
      runHook()
    }, 3000)
  })

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          {getLayout(<Component {...pageProps} />)}
        </PersistGate>
      </Provider>
      <ToastContainer />
      {/* <BetaToast /> */}
    </ThemeProvider>
  );
}
