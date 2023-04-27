import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/ordinary/Header";
import { CustomThemeProvider } from "./core/providers/customThemeProvider";
import PostsListPage from "./pages/PostsListPage";
import PostPage from "./pages/PostPage";
import NavigationBar from "./components/ui/Breadcrumbs";
import ErrorPage from "./components/simple/errorPage";
import HomePage from "./pages/HomePage";
import AlbumsPage from "./pages/AlbumsPage";
import PhotosPage from "./pages/PhotosPage";

function App() {
  return (
    <CustomThemeProvider>
      <Header />
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<PostsListPage />} />
        <Route path="/albums" element={<AlbumsPage />} />
        <Route path="/albums/:id" element={<PhotosPage />} />
        <Route path="/posts/:id" element={<PostPage />} />
        <Route path="*" element={<ErrorPage error={"404 Not Found"} />} />
      </Routes>
    </CustomThemeProvider>
  );
}

export default App;
