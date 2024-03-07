import { configureStore } from "@reduxjs/toolkit";
import filterSortReducer from "./slices/filterSlice";
import { moviesApiSlice } from "./slices/moviesApiSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
	reducer: {
		[moviesApiSlice.reducerPath]: moviesApiSlice.reducer,
		user: userReducer,
		filterSort: filterSortReducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(moviesApiSlice.middleware);
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
