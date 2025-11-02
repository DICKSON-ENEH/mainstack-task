import { Provider } from "../src/components/ui/provider";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "../src/styles/fonts.css";
import { MantineProvider } from "@mantine/core";
// import { Box } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <MantineProvider>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);
