import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Error from "../Error/Error";
import Home from "../pages/Home/Home";
import HomeLayouts from "../HomeLayouts/HomeLayouts";
import UpcomingEvents from "../UpcomingEvents/UpcomingEvents";
import Login from "../Login/Login";
import Register from "../Register/Register";
import ForgotPassword from "../Login/ForgotPassword";
import CreateEvent from "../Dropdown/CreateEvent";
import ManageEvents from "../Dropdown/ManageEvents";
import JoinedEvents from "../Dropdown/JoinedEvents";
import EventDetails from "../Dropdown/EventDetails";
import UpdateEvent from "../Dropdown/UpdateEvent";
import HelpDsk from "../pages/Home/HelpDsk";
import Test from "../components/Test";

const Routers = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayouts />,
    errorElement: <Error />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/upcomingEvents",
        element: <UpcomingEvents></UpcomingEvents>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/ForgotPassword",
        element: <ForgotPassword></ForgotPassword>,
      },
      {
        path: "/CreateEvent",
        element: <CreateEvent></CreateEvent>,
      },
      {
        path: "/ManageEvents",
        element: <ManageEvents></ManageEvents>,
      },
      {
        path: "/JoinedEvents",
        element: <JoinedEvents></JoinedEvents>,
      },
      {
        path: "/event/:id",
        element: <EventDetails></EventDetails>,
      },
      {
        path: "/updateEvent/:id",
        element: <UpdateEvent></UpdateEvent>,
      },
      {
        path: "/helpDesk",
        element: <HelpDsk></HelpDsk>,
      },
      {
        path: "/test",
        element: <Test></Test>,
      },
    ],
  },
]);

export default Routers;
