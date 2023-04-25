import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { CustomThemeProvider } from "./core/providers/customThemeProvider";
import MainPage from "./pages/MainPage";
import PostPage from "./pages/PostPage";
import Header from "./components/ordinary/Header";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
    },
    {
      path: "/:id",
      element: <PostPage />,
    },
  ]);

  return (
    <CustomThemeProvider>
      <Header />
      <RouterProvider router={router} />;
    </CustomThemeProvider>
  );
}

export default App;
