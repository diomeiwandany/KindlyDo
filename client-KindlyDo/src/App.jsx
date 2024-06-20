import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom"
import Login from "./pages/Login"
import MyTask from "./pages/MyTask"
import AllTask from "./pages/AllTask";
import OtherTask from "./pages/OtherTask";
import AddTask from "./pages/AddTask";
import UpdateTask from "./pages/UpdateTask";
import ProUser from "./pages/ProUser";
import AITask from "./pages/AITask";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    loader: () => {
      if (!localStorage.access_token) {
        return redirect('/login');
      } else {
        return redirect('/task/my');
      }
    }
  },
  {
    path: "/task/my",
    element: <MyTask />,
    loader: () => {
      if (!localStorage.access_token) {
        return redirect('/login');
      }
      return null;
    }
  },
  {
    path: "/task/all",
    element: <AllTask />,
    loader: () => {
      if (!localStorage.access_token) {
        return redirect('/login');
      }
      return null;
    }
  },
  {
    path: "/task/other",
    element: <OtherTask />,
    loader: () => {
      if (!localStorage.access_token) {
        return redirect('/login');
      }
      return null;
    }
  },
  {
    path: "/task/add",
    element: <AddTask />,
    loader: () => {
      if (!localStorage.access_token) {
        return redirect('/login');
      }
      return null;
    }
  },
  {
    path: "/task/:id",
    element: <UpdateTask />,
    loader: () => {
      if (!localStorage.access_token) {
        return redirect('/login');
      }
      return null;
    }
  },
  {
    path: `/pro/:id`,
    element: <ProUser />,
    loader: () => {
      if (!localStorage.access_token) {
        return redirect('/login');
      }
      return null;
    }
  },
  {
    path: `/task/ai`,
    element: <AITask />,
    loader: () => {
      if (!localStorage.access_token) {
        return redirect('/login');
      }
      return null;
    }
  },
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
