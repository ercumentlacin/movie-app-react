export interface DB {
	movies: Movie[];
}

export interface Movie {
	id: string;
	name: string;
	year: number;
	country: Country;
	imdb: string;
	category: string;
	isTvSeries: boolean;
	summary: string;
	poster: string;
}

export enum Country {
	USAUnitedKingdom = "USA, United Kingdom",
	Usa = "USA",
}
