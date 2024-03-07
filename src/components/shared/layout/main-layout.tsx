import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { User, setUser } from "@/app/slices/userSlice";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../navbar/navbar";

const MainLayout = () => {
	const { pathname } = useLocation();
	const isLoginPage = pathname === "/login";

	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user);

	const localUser = JSON.parse(localStorage.getItem("user") || "{}") as User;
	console.log({
		isLoginPage,
		user,
		localUser,
	});

	if (!user.email && localUser.email) {
		dispatch(setUser(localUser));
		return <Navigate to="/" replace />;
	}

	if (isLoginPage && (user.email || localUser.email)) {
		return <Navigate to="/" replace />;
	}

	if (!isLoginPage && !user.email) {
		return <Navigate to="/login" replace />;
	}

	return (
		<>
			{!isLoginPage && <Navbar />}
			<Outlet />
		</>
	);
};

export default MainLayout;
