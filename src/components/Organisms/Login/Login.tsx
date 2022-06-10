import React, { useContext, useEffect } from "react";
import axios from "axios";

import Button from "../../Atoms/Button/Button";
import Input from "../../Atoms/Input/Input";
import "./Login.scss";
import useLogin from "./useLogin";
import { AuthContext } from "./auth";

type Props = {
	register?: boolean;
	onChange: () => void;
	onLogin?: Function;
};

const LogIn = (props: Props) => {
	const { register, onChange, onLogin } = props;
	const {
		login,
		password,
		setLogin,
		setPassword,
		passwordRepeat,
		setPasswordRepeat,
		handleReset,
	} = useLogin(register);

	const { setToken } = useContext(AuthContext);

	const handleOnClick = async () => {
		if (register) {
			if (password !== passwordRepeat) {
				return;
			}
			try {
				onChange();
				handleReset();
				return axios.post("http://localhost:3005/users/register", {
					password: password,
					username: login,
				});
			} catch (err) {
				console.log(err);
			}
		}
		try {
			const data = await axios.post("http://localhost:3005/users/login", {
				password: password,
				username: login,
			});
			onLogin && onLogin(login);
			return setToken(data.data);
		} catch (err) {
			console.log(err);
		}
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
				<Button onClick={handleOnClick}>
					{register ? "Register" : "Login"}
				</Button>
				<div className="login-container__register">
					<span onClick={onChange}>
						{register ? "Log in into account" : "Register to service"}
					</span>
				</div>
			</div>
		</div>
	);
};

export default LogIn;
