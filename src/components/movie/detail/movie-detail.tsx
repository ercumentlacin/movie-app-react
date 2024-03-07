import { Movie } from "@/types";
import { CalendarIcon, MapPinIcon, StarIcon } from "lucide-react";
import "./movie.detail.style.css";

interface Props extends Movie {}

const MovieDetail = (props: Props) => {
	return (
		<div className="movie-detail">
			<div className="movie-detail-left">
				<h1>{props.name}</h1>
				<div className="categories">
					{props.category.split(",").map((category) => (
						<span key={category}>{category}</span>
					))}
				</div>
				<div className="rating">
					<StarIcon />
					{props.imdb}
				</div>
				<div className="year">
					<p>
						<CalendarIcon />
						{props.year}
					</p>
					<p>
						<MapPinIcon />
						{props.country}
					</p>
				</div>
				<div className="summary">
					<p>{props.summary}</p>
				</div>
			</div>
			<div className="movie-detail-right">
				<img alt={props.name} height={600} src={props.poster} width={400} />
			</div>
		</div>
	);
};

export default MovieDetail;
