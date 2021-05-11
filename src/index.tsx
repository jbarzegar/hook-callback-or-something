import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "jotai";
import {
  ChakraProvider,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "react-query";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const theme = extendTheme(withDefaultColorScheme({ colorScheme: "orange" }));

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider>
        <QueryClientProvider client={new QueryClient()}>
          <div>
            <App />
          </div>
        </QueryClientProvider>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
