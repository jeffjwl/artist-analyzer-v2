import React, { useState } from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import Content from "./components/Content";
import { ArtistData } from "./models/types";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Content />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
