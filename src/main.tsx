import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { store } from "./app/store.ts";
import MainLayout from "./components/shared/layout/main-layout.tsx";
import LoginPage from "./routes/login/login.tsx";
import MovieDetailPage from "./routes/movie/[id]/page.tsx";
import NotFoundPage from "./routes/not-found/not-found.tsx";
import HomePage from "./routes/page.tsx";
import "./styles/global.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error("Could not find root element");
}

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		errorElement: <NotFoundPage />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "/movie/:id",
				element: <MovieDetailPage />,
			},
			{
				path: "/login",
				element: <LoginPage />,
			},
		],
	},
]);

ReactDOM.createRoot(rootElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>,
);
