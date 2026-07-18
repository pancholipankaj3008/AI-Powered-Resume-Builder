import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./index.css";
import { Toaster } from "react-hot-toast";

import { GetProfile } from "./redux/profile/profileSlice";
import AppRoutes from "./routes/AppRoutes";

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetProfile());
    }, [dispatch]);

    return (
    <>
        <Toaster
            position="top-right"
            reverseOrder={false}
        />

        <AppRoutes />
    </>
);
}

export default App;