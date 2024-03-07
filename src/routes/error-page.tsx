import { useRouteError } from "react-router-dom";

export default function HomeErrorPage() {
	const error = useRouteError();
	console.error(error);

	let message = "Sorry, an unexpected error has occurred.";

	if (error instanceof Error && error.message) {
		message = error.message;
	}

	return (
		<div id="error-page">
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				{/* <i>{error.statusText || error.message}</i> */}
				<i>{message}</i>
			</p>
		</div>
	);
}
