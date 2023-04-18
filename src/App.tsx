import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import PostsList from "./components/PostsList/PostsList";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PostsList />,
    },
    {
      path: "/:id",
      element: <div>asdadas</div>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
