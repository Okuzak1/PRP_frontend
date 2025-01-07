import TopPage from "../view/TopPage";
import LoginPage from "../view/LoginPage";
import ArtGalleryPage from "../view/ArtGalleryPage";
import PictureDetailPage from "../view/PictureDetailPage";
import ProfilePage from "../view/ProfilePage";
import RegisterPage from "../view/RegisterPage";
import SearchPage from "../view/SearchPage";
import AntdTestPage from "../view_test/AntdTestPage";
import LLMTestPage from "../view_test/LLMTestPage";
import ImageProcessTestPage from "../view_test/ImageProcessTestPage";

const { createBrowserRouter } = require("react-router-dom");


const router = createBrowserRouter([
    {
        path:'/',
        element: <TopPage />,
    },
    {
        path:'/login',
        element: <LoginPage />
    },
    {
        path:'/register',
        element: <RegisterPage />
    },
    {
        path:'/profile',
        element: <ProfilePage />
    },
    {
        path:'/art-gallery',
        element: <ArtGalleryPage />
    },
    {
        path:'/search',
        element: <SearchPage />
    },
    {
        path:'/detail',
        element: <PictureDetailPage />
    },
    {
        path:'/antd-test',
        element: <AntdTestPage />
    },
    {
        path:'/llm-test',
        element: <LLMTestPage />
    },
    {
        path:'/img-test',
        element: <ImageProcessTestPage />
    }
], 
    {basename: '/PRP_frontend'}  // github page
);

export default router