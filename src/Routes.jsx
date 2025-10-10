import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Casino from "./pages/Casino";
import LiveCasino from "./pages/LiveCasino";
import Sports from "./pages/Sports";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfileHistory from "./pages/Profile/ProfileHistory";
import ProfileEdit from "./pages/Profile/ProfileEdit";
import ProfileChangePassword from "./pages/Profile/ProfileChangePassword";
import NoPage from "./pages/NoPage";
import Layout from "./components/Layout";

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/casino" element={<Casino />} />
                <Route path="/live-casino" element={<LiveCasino />} />
                <Route path="/sports" element={<Sports />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile/history" element={<ProfileHistory />} />
                <Route path="/profile/edit" element={<ProfileEdit />} />
                <Route path="/profile/change-password" element={<ProfileChangePassword />} />
                <Route path="*" element={<NoPage />} />
            </Route>
        </Routes>
    );
}