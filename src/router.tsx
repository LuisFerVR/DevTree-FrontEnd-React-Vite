import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterView from "./views/RegisterView";
import LoginView from "./views/LoginView";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth/register" element={<RegisterView/>}/>
                <Route path="/auth/login" element={<LoginView/>}/>
            </Routes>
        </BrowserRouter>
    )
}