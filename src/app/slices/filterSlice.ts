import { Movie } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface FilterSortConfiguration {
	filter: {
		favorite: boolean;
		name: string;
	};
	sort: {
		by: keyof Movie;
		direction: string;
	};
	result: Movie[];
}

const initialState: FilterSortConfiguration = {
	filter: {
		favorite: false,
		name: "",
	},
	sort: {
		by: "name",
		direction: "asc",
	},
	result: [],
};

export const filterSortSlice = createSlice({
	name: "filterSort",
	initialState,
	reducers: {
		setFilter: (
			state,
			action: PayloadAction<Partial<FilterSortConfiguration["filter"]>>,
		) => {
			state.filter = { ...state.filter, ...action.payload };
		},
		setSort: (
			state,
			action: PayloadAction<Partial<FilterSortConfiguration["sort"]>>,
		) => {
			state.sort = { ...state.sort, ...action.payload };
		},
		resetFilterSort: (state) => {
			state.filter = initialState.filter;
			state.sort = initialState.sort;
			state.result = initialState.result;
		},
	},
});

export const { setFilter, setSort, resetFilterSort } = filterSortSlice.actions;
export default filterSortSlice.reducer;
