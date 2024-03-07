import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setFilter } from "@/app/slices/filterSlice";
import { resetUser } from "@/app/slices/userSlice";
import { FilmIcon, LogOutIcon, SearchIcon, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../input/input";
import "./navbar.style.css";

const Navbar = () => {
	const user = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();
	const [query, setQuery] = useState("");
	const navigate = useNavigate();

	const logOut = () => {
		localStorage.removeItem("user");
		dispatch(resetUser());
		navigate("/login");
	};

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			dispatch(
				setFilter({
					name: query,
				}),
			);
		}, 500);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [dispatch, query]);

	return (
		<header>
			<div className="container">
				<div className="wrapper">
					<div className="left">
						<Link className="" to="/">
							<FilmIcon />
							Movies
						</Link>
					</div>
					<div className="right">
						<div className="search-container">
							<Input
								placeholder="Search..."
								type="search"
								value={query}
								onChange={(e) => {
									setQuery(e.target.value);
								}}
							/>
							<SearchIcon />
						</div>
						<div className="actions">
							<div>
								<button type="button" className="action">
									<Star />
									<span>Favorites ({user.favoriteMovies.length})</span>
								</button>

								<button
									onClick={logOut}
									type="button"
									className="action action-btn"
								>
									<LogOutIcon />
									<span>Logout</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
