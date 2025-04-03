import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterView from "./views/RegisterView";
import LoginView from "./views/LoginView";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import LinkTreeView from "./views/LinkTreeView";
import ProfileView from "./views/ProfileView";
import HandleView from "./views/HandleView";
import NotFoundView from "./views/NotFoundView";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element = {<AuthLayout/>}>
                    <Route path="/auth/register" element={<RegisterView/>}/>
                    <Route path="/auth/login" element={<LoginView/>}/>
                </Route>

                <Route path="/admin" element = {<AppLayout/>}>
                    <Route index= {true} element = {<LinkTreeView />} />
                    <Route path="profile" element = {<ProfileView />}/>
                </Route>

                <Route path="/:handle" element={<AuthLayout />}>
                    <Route element={<HandleView />} index={true} />
                </Route>

                <Route path="/404" element={<AuthLayout />}>
                    <Route index={true} element={<NotFoundView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}