import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import RoomDetailsPage from "./pages/RoomDetailsPage";
import ControlPanel from "./pages/ContolPanelPage";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<ControlPanel />} />
      <Route path="/ControlPanel/" element={<ControlPanel />} />
      <Route path="/RoomDetailsPage/:id" element={<RoomDetailsPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

//
//  errorElement={<ErrorPage />}>
