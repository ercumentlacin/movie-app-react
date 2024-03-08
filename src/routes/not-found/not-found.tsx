import { Link } from "react-router-dom";
import "./style.css";

const NotFoundPage = () => {
	return (
		<div className="not-found-page">
			<section>
				<div>
					<h1>404: Page Not Found</h1>
					<p>Sorry, we couldn't find the page you're looking for.</p>
				</div>
				<Link to="/">Return to the Homepage</Link>
			</section>
		</div>
	);
};

export default NotFoundPage;
