import React, { useContext, useEffect } from "react";
import axios from "axios";

import Button from "../../Atoms/Button/Button";
import Input from "../../Atoms/Input/Input";
import "./Login.scss";
import useLogIn from "./useLogin";
import { AuthContext } from "./auth";

type Props = {
	register?: boolean;
};

const LogIn = (props: Props) => {
	const { register } = props;
	const {
		login,
		password,
		setLogin,
		setPassword,
		passwordRepeat,
		setPasswordRepeat,
	} = useLogIn();

	const { setToken } = useContext(AuthContext);

	const handleOnClick = async () => {
		if (register) {
			if (password !== passwordRepeat) {
				return;
			}
			try {
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
				<Button onClick={handleOnClick}>Login</Button>
			</div>
		</div>
	);
};

export default LogIn;
