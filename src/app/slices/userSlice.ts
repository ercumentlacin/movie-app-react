import { createSlice } from "@reduxjs/toolkit";

export interface User {
	email: string;
	password: string;
	favoriteMovies: string[];
}

const initialState: User = {
	email: "",
	password: "",
	favoriteMovies: [],
};

type LoginResponse =
	| {
			user: User;
			success: true;
			// eslint-disable-next-line no-mixed-spaces-and-tabs
	  }
	| {
			success: false;
			message: string;
			// eslint-disable-next-line no-mixed-spaces-and-tabs
	  };

function checkUser(email: string, password: string): LoginResponse {
	const localUser = localStorage.getItem("user");
	if (localUser) {
		const user = JSON.parse(localUser) as User;
		if (user.email === email && user.password === password) {
			return {
				user,
				success: true,
			};
		}
		return {
			success: false,
			message: "Invalid email or password",
		};
	}
	const newUser: User = { email, password, favoriteMovies: [] };
	localStorage.setItem("user", JSON.stringify(newUser));

	return {
		user: newUser,
		success: true,
	};
}

export const userSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {
		setUser: (state, action) => {
			const result = checkUser(action.payload.email, action.payload.password);

			if (result.success) {
				state.email = action.payload.email;
				state.password = action.payload.password;
				state.favoriteMovies = result.user.favoriteMovies;
			} else {
				throw new Error(result.message);
			}
		},
		resetUser: (state) => {
			state.email = "";
			state.password = "";
			state.favoriteMovies = [];
		},
		toggleFavoriteMovie: (state, action) => {
			const index = state.favoriteMovies.indexOf(action.payload);
			if (index === -1) {
				state.favoriteMovies.push(action.payload);
			} else {
				state.favoriteMovies.splice(index, 1);
			}

			localStorage.setItem("user", JSON.stringify(state));
		},
	},
});

export const { setUser, resetUser, toggleFavoriteMovie } = userSlice.actions;
export default userSlice.reducer;
