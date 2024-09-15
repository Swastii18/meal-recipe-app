import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { Layout } from "./Layout";
import { Login } from "./Login"
import { Register } from "./Register"
import { SearchPage } from "./SearchPage";
import { Categories } from "./Categories";
import { PrivateRoutes } from "./PrivateRoutes";
export const SiteRoutes = () => <BrowserRouter>
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<PrivateRoutes><Home /></PrivateRoutes>} />
           
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="search/name/:id" element={<PrivateRoutes><SearchPage /></PrivateRoutes>} />
            <Route path="categories" element={<PrivateRoutes><Categories/></PrivateRoutes>}/>
        </Route>
    </Routes>
</BrowserRouter>