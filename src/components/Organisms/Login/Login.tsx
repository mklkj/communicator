import React, { useContext, useEffect } from "react";
import axios from "axios";

import Button from "../../Atoms/Button/Button";
import Input from "../../Atoms/Input/Input";
import "./Login.scss";
import useLogin from "./useLogin";
import { AuthContext } from "./auth";

type Props = {
	register?: boolean;
	onChange: (set: () => void) => void;
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
		wrongPassword,
		setWrongPassword,
	} = useLogin(register);

	const { setToken } = useContext(AuthContext);

	const handleOnClick = async () => {
		if (register) {
			if (password !== passwordRepeat) {
				setWrongPassword(true);
				return;
			}
			try {
				onChange(() => setWrongPassword(false));
				handleReset();
				return axios.post("http://localhost:3005/users/register", {
					password: password,
					username: login,
				});
			} catch (err) {
				setWrongPassword(true);
				console.log(err);
			}
		}
		try {
			const data = await axios.post("http://localhost:3005/users/login", {
				password: password,
				username: login,
			});
			if (data?.data === false) {
				setWrongPassword(true);
				return;
			}
			document.cookie = `token=${data?.data}; path=/; max-age=${60 * 60 * 24};`;
			document.cookie = `user=${login}; path=/; max-age=${60 * 60 * 24};`;
			document.cookie = `currentDate=${Date.now()}; path=/; max-age=${
				60 * 60 * 24
			};`;
			onLogin && onLogin(login, data?.data);
			return setToken(data?.data);
		} catch (err) {
			setWrongPassword(true);
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
				<div className="login-container__text">
					<span onClick={() => onChange(() => setWrongPassword(false))}>
						{register ? "Log in into account" : "Register to service"}
					</span>
				</div>
				{wrongPassword && (
					<div className="login-container__wrong">
						<span>{register ? "Passwords don't match" : "Wrong password"}</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default LogIn;
