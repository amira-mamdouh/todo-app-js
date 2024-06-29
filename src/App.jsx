import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ArabicApp from "./Components/ArapicApp/ArabicApp";
import EnglishApp from "./Components/EnglishApp/EnglishApp";

const router = createBrowserRouter(
  [
    {
      path: "/arabic",
      element: <ArabicApp />,
    },
    {
      path: "/english",
      element: <EnglishApp />,
    },
  ],
  {
    basename: "/english",
  }
);

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
