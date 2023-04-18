import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import PostsList from "./components/PostsList/PostsList";
import PostPage from "./components/PostsList/components/PostsItem/components/PostPage/PostPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PostsList />,
    },
    {
      path: "/:id",
      element: <PostPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
