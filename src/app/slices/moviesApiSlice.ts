import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Movie } from "../../types";

export const moviesApiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
	endpoints: (builder) => ({
		getMovies: builder.query<Movie[], void>({
			query: () => "/movies",
		}),
	}),
});

export const { useGetMoviesQuery } = moviesApiSlice;
