
import { createHashRouter } from "react-router-dom";
import Dashboard from "../page/Dashboard";
import DailySessions from "../page/DailySessions";
import MonthlyNotes from "../page/MonthlyNotes";
import Session from "../page/Session";
import MainLayout from "../Layout/MainLayout";
import GroupManagement from "../page/GroupManagement";


export const router = createHashRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Dashboard /> }, 
      { path: "daily-sessions", element: <DailySessions /> },
      { path: "monthly-notes", element: <MonthlyNotes /> },
      { path: "session-archive", element: <Session /> },
      { path: "group-management", element: <GroupManagement /> },
    ],
  },
]);