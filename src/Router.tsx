import {
    createBrowserRouter,
  } from "react-router-dom";

import Home from './pages/Home'

export const blueprint = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    }
])