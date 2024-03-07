import { StarIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Movie } from "../../../types";
import "./card.style.css";

interface Props extends Movie {
	isFavorite: boolean;
	toggleFavorite: () => void;
}

const Card = ({
	name,
	poster,
	category,
	year,
	summary,
	imdb,
	country,
	isTvSeries,
	id,
	isFavorite,
	toggleFavorite,
}: Props) => {
	return (
		<article className="card">
			<Link className="card__link" to={`/movie/${id}`}>
				<span className="sr-only">View</span>
			</Link>
			<img alt="Movie poster" height={590} src={poster} width={400} />
			<section>
				<h3>
					{name}
					<button type="button" onClick={toggleFavorite}>
						{isFavorite ? (
							<StarIcon fill="gold" color="gold" />
						) : (
							<StarIcon color="gold" />
						)}
					</button>
				</h3>
				<p className="category-container">
					Drama, Sci-Fi
					{category.split(", ")?.map((cat, index) => (
						<span key={cat}>
							{index === 0 ? "" : ", "}
							{cat}
						</span>
					))}
				</p>
				<p className="summary">
					{summary.length > 150 ? `${summary.substring(0, 150)}...` : summary}
				</p>
				<footer>
					<p>
						IMDB: {imdb} | Country: {country} | Year: {year}
					</p>
				</footer>
			</section>
			{isTvSeries && <div className="tv-series">TV SERIES</div>}
		</article>
	);
};

export default Card;
