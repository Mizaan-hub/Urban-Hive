import{
  createBrowserRouter, //Creates Browser Router to redirect to different pages
  RouterProvider,
}from "react-router-dom"
import ListPage from './routes/ListPage/ListPage';
import { Layout, RequireAuth } from './routes/Layout/Layout';
import HomePage from './routes/HomePage/HomePage';
import SinglePage from "./routes/SinglePage/SinglePage";
import ProfilePage from "./routes/ProfilePage/ProfilePage";
import LogIn from "./routes/LogIn/LogIn";
import Register from "./routes/Register/Register";
import ProfileUpdatePage from "./routes/ProfileUpdatePage/ProfileUpdatePage";
import NewPostPage from "./routes/NewPostPage/NewPostPage";
import { ListPageLoader, ProfilePageLoader, SinglePageLoader } from "./lib/loaders";

function App() {

  const router = createBrowserRouter([
    {
      path: "/", //setting default layout to every page
      element: <Layout/>,
      children:[ //calling children using outlet function
        {
          path: "/",
          element: <HomePage/>
        },
        {
          path: "/list",
          element: <ListPage/>,
          loader: ListPageLoader
        },
        {
          path:"/:id",
          element: <SinglePage/>,
          loader: SinglePageLoader
        },
        {
          path:"/login",
          element: <LogIn/>
        },
        {
          path:"/register",
          element: <Register/>
        }
      ]
    },
    {
      path:"/",
      element:<RequireAuth/>,
      children:[
        {
          path:"/profile",
          element:<ProfilePage/>,
          loader: ProfilePageLoader
        },
        {
          path:"/profile/update",
          element:<ProfileUpdatePage/>
        },
        {
          path:"/add",
          element:<NewPostPage/>
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router}/>
  )
}

export default App