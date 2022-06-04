import React from "react";
import Input from "../../Atoms/Input/Input";
import "./Login.scss";
import useLogin from "./useLogin";

type Props = {
	data: {
		setLogIn: (isLoggedIn: Boolean) => void,
	}
	register?: boolean;
};

const Login = (props: Props) => {
	const { data, register } = props;
	const {
		login,
		password,
		setLogin,
		setPassword,
		passwordRepeat,
		setPasswordRepeat,
	} = useLogin();

	const handleOnClick = () => {
		console.log(login, password);

		if (login === "admin" && password === "admin") {
			data.setLogIn(true);
		}
	};

	return (
		<div className="login">
			<form className="login-container">
				<Input
					value={login}
					onChange={setLogin}
					placeholder="login"
					className="login-input"
				/>
				<Input
					value={password}
					onChange={setPassword}
					placeholder="password"
					type="password"
					className="login-input"
				/>
				{register && (
					<Input
						value={passwordRepeat}
						onChange={setPasswordRepeat}
						placeholder="reapet password"
						type="password"
						className="login-input"
					/>
				)}
				<button type="submit" onClick={handleOnClick}>Login</button>
			</form>
		</div>
	);
};

export default Login;
