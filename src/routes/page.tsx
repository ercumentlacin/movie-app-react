import { useGetMoviesQuery } from "../app/slices/moviesApiSlice";
import MovieList from "../components/movie/list/movie-list";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { resetFilterSort, setFilter, setSort } from "@/app/slices/filterSlice";
import Switch from "@/components/movie/switch/switch";
import { Movie } from "@/types";
import { SortAsc, SortDesc } from "lucide-react";
import "./movie-list-page.style.css";

const sortOptions = [
	{
		name: "Name",
		value: "name" as keyof Movie,
	},
	{
		name: "Year",
		value: "year" as keyof Movie,
	},
	{
		name: "Imdb Score",
		value: "imdb" as keyof Movie,
	},
];

const HomePage = () => {
	const { data: movies, error, isLoading } = useGetMoviesQuery();
	const dispatch = useAppDispatch();
	const filter = useAppSelector((state) => state.filterSort.filter);
	const sort = useAppSelector((state) => state.filterSort.sort);

	const favoriteMovies = useAppSelector((state) => state.user.favoriteMovies);

	const filterByFavorite = filter.favorite;

	const toggleFavoriteFilter = () => {
		dispatch(
			setFilter({
				favorite: !filterByFavorite,
			}),
		);
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.toString()}</div>;
	}

	if (!movies) {
		return null;
	}

	let filteredMovies = movies.toSorted((a, b) => {
		if (sort.direction === "asc") {
			return a[sort.by] > b[sort.by] ? 1 : -1;
		}
		return a[sort.by] < b[sort.by] ? 1 : -1;
	});

	if (filterByFavorite) {
		filteredMovies = filteredMovies.filter((movie) =>
			favoriteMovies.includes(movie.id),
		);
	}

	if (filter.name) {
		filteredMovies = filteredMovies.filter((movie) =>
			movie.name.toLowerCase().includes(filter.name.toLowerCase()),
		);
	}

	const updateSortOption = (option: (typeof sortOptions)[number]) => {
		dispatch(
			setSort({
				by: option.value,
				direction:
					sort.by === option.value && sort.direction === "asc" ? "desc" : "asc",
			}),
		);
	};

	return (
		<div className="movie-list-page" data-no-movies={filteredMovies.length < 1}>
			<header>
				<h1>Discover Movies</h1>
				<p>Browse our collection of amazing movies</p>
			</header>

			<section>
				<div className="filter-favorite">
					<span>Favorite</span>
					<Switch checked={filterByFavorite} onChange={toggleFavoriteFilter} />
				</div>

				<div className="sort-by">
					<label htmlFor="sort-by">
						<span>Sort By</span>
					</label>
					<input type="checkbox" id="sort-by" />
					<ul className="options">
						{sortOptions.map((option) => (
							<li
								role="button"
								key={option.value}
								onKeyDown={(e) => {
									if (e.key === "Enter") updateSortOption(option);
								}}
								onClick={() => updateSortOption(option)}
							>
								{option.name}{" "}
								{sort.by === option.value && sort.direction === "asc" ? (
									<SortDesc />
								) : (
									<SortAsc />
								)}
							</li>
						))}
					</ul>
				</div>
			</section>
			{filteredMovies.length > 0 && <MovieList movies={filteredMovies} />}
			{filteredMovies.length < 1 && (
				<div className="not-found">
					<h3>No Movies Available</h3>
					<p>
						Please check back later for new additions.{" "}
						<button
							type="button"
							onClick={() => {
								dispatch(resetFilterSort());
							}}
						>
							Reset Filters
						</button>
					</p>
				</div>
			)}
		</div>
	);
};

export default HomePage;
