import React from "react";
import Button from "../../Atoms/Button/Button";
import Input from "../../Atoms/Input/Input";
import "./Login.scss";
import useLogin from "./useLogin";

type Props = {
	register?: boolean;
};

const Login = (props: Props) => {
	const { register } = props;
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
	};

	return (
		<div className="login">
			<div className="login-container">
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
				<Button onClick={handleOnClick}>Login</Button>
			</div>
		</div>
	);
};

export default Login;
