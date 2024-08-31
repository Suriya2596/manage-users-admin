import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/index.css";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
// import ReduxProvider from "./redux/ReduxProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

export const theme = createTheme({
  // colors: {
  //   // primary: ["#581D9E", "#B587EC", "#D5C8E5"],
  //   // dark: ["#180A28", "#200046", "#6F667A"],
  //   // white: ["#F8F3FF"]
  // },
});
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* <ReduxProvider> */}
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        <App />
      </MantineProvider>
      {/* </ReduxProvider> */}
    </BrowserRouter>
  </StrictMode>
);
