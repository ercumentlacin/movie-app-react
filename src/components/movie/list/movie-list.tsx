import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { toggleFavoriteMovie } from "@/app/slices/userSlice";
import { Movie } from "../../../types";
import Card from "../card/Card";
import "./movie-list.style.css";

interface Props {
	movies: Movie[];
}

const MovieList = ({ movies }: Props) => {
	const dispatch = useAppDispatch();
	const favoriteMovies = useAppSelector((state) => state.user.favoriteMovies);

	const toggleFavorite = (id: string) => {
		dispatch(toggleFavoriteMovie(id));
	};

	return (
		<div className="movie-list">
			{movies.map((movie) => (
				<Card
					{...movie}
					key={movie.id}
					isFavorite={favoriteMovies.includes(movie.id)}
					toggleFavorite={() => toggleFavorite(movie.id)}
				/>
			))}
		</div>
	);
};

export default MovieList;
