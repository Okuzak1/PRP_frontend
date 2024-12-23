import ArtGalleryPage from "../page/ArtGalleryPage";
import PictureDetailPage from "../page/PictureDetailPage";
import ProfilePage from "../page/ProfilePage";
import RegisterPage from "../page/RegisterPage";
import SearchPage from "../page/SearchPage";
import TestPage from "../page/TestPage";

const { createBrowserRouter } = require("react-router-dom");
const { default: TopPage } = require("../page/TopPage");
const { default: LoginPage } = require("../page/LoginPage");


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
        path:'/test',
        element: <TestPage />
    }
], 
{basename: '/PRP_frontend'}  // github page
);

export default router