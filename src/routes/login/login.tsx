import { useAppDispatch } from "@/app/hooks";
import { setUser } from "@/app/slices/userSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as yup from "yup";
import "./login.style.css";

type UserFormData = {
	email: string;
	password: string;
};

const schema = yup.object({
	email: yup
		.string()
		.email("Email should have a valid format")
		.required("Email is required"),

	password: yup
		.string()
		.min(8, "Password should be of minimum 8 characters length")
		.matches(/^(?=.*[A-Z])(?=.*\d)/, {
			message:
				"Password should contain at least one uppercase letter and one integer",
		})
		.required("Password is required"),
});

const LoginPage = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<UserFormData>({
		resolver: yupResolver(schema),
	});

	const dispatch = useAppDispatch();

	const onSubmit: SubmitHandler<UserFormData> = (data) => {
		dispatch(setUser(data));
		navigate("/");
	};

	const disabled =
		Object.keys(errors).length > 0 || !watch("email") || !watch("password");

	return (
		<div className="login-container">
			<form className="login" onSubmit={handleSubmit(onSubmit)}>
				<header>
					<h3>Login</h3>
					<p>
						Enter the email address and password associated with your account.
					</p>
					<div className="alert">
						{errors.email && <p>{errors.email.message}</p>}
						{errors.password && <p>{errors.password.message}</p>}
					</div>
				</header>
				<main>
					<div className="wrapper">
						<div>
							<label htmlFor="email">Email</label>
							<input
								id="email"
								placeholder="m@example.com"
								required
								type="email"
								autoComplete="email"
								{...register("email", { required: true })}
							/>
						</div>
						<div>
							<label htmlFor="password">Password</label>
							<input
								id="password"
								autoComplete="current-password"
								required
								type="password"
								{...register("password", { required: true })}
							/>
						</div>
					</div>
				</main>
				<footer>
					<button disabled={disabled} type="submit">
						Login
					</button>
				</footer>
			</form>
		</div>
	);
};

export default LoginPage;
