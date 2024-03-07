import { useGetMoviesQuery } from "@/app/slices/moviesApiSlice";
import MovieDetail from "@/components/movie/detail/movie-detail";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

const MovieDetailPage = () => {
	const { id } = useParams();
	const { data: movies, isLoading, isFetching, error } = useGetMoviesQuery();

	const movie = useMemo(
		() => movies?.find((movie) => movie.id === id),
		[id, movies],
	);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isFetching) {
		return <div>Fetching...</div>;
	}

	if (error) {
		return <div>Error: {error.data}</div>;
	}

	if (!movie) {
		return <div>Movie not found</div>;
	}

	return <MovieDetail {...movie} />;
};

export default MovieDetailPage;
