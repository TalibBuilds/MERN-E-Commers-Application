import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AxiosInstence from "../utils/AxiosInstence";
import { setUser, clearUser } from "../redux/userSlice";

const useCurrentUser = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);

    useEffect(() => {
        if (currentUser) return;

        const fetchCurrentUser = async () => {
            try {
                 console.log("🔥 /me API CALL");
                const response = await AxiosInstence.get("/api/auth/me");
                dispatch(setUser(response.data.user));
            } catch (err) {
                dispatch(clearUser());
                console.log(err)
            }
        };

        fetchCurrentUser();
    }, [currentUser, dispatch]);
};

export default useCurrentUser;