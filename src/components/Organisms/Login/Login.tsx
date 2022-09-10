import React, { useEffect, useContext } from "react";
import axios from "axios";
import { post } from "../../../helpers/api";
import Button from "../../Atoms/Button/Button";
import Input from "../../Atoms/Input/Input";
import "./Login.scss";
import useLogin from "./useLogin";
import { AuthContext } from "./auth";

type Props = {
	activate?: boolean;
	logged?: string;
	register?: boolean;
	onChange: (type: string, set: () => void) => void;
	onLogin?: Function;
};

const LogIn = (props: Props) => {
	const { activate, logged, register, onChange, onLogin } = props;
	const {
		login,
		password,
		setLogin,
		setPassword,
		passwordRepeat,
		setPasswordRepeat,
		handleReset,
		errorMessage,
		setErrorMessage,
	} = useLogin(activate, register);

	const { isPasswordConfirmed, setToken, setIsPasswordConfirmed } =
		useContext(AuthContext);

	const handleOnClick = async () => {
		if (register) {
			if (password !== passwordRepeat) {
				setErrorMessage("Passwords don't match");
				return;
			}
			try {
				handleReset();
				await post("/users/register", {
					password: password,
					username: login || logged,
				});
				onChange("chat", () => setErrorMessage(""));
			} catch (err) {
				// @ts-ignore
				if (err.response.status === 400) {
					setErrorMessage("Account already exists");
				} else {
					// @ts-ignore
					setErrorMessage(`Unknown error: ${err.message}`);
				}
			}
		} else if (activate) {
			if (password !== passwordRepeat) {
				setErrorMessage("Passwords don't match");
				return;
			}
			try {
				handleReset();
				const data = await post("/user/confirm-password", {
					password: password,
					username: login || logged,
				});
				document.cookie = `isPasswordConfirmed=${true}; path=/; max-age=${
					60 * 60 * 24
				};`;
				onChange(data.data.isPasswordConfirmed ? "chat" : "login", () =>
					setErrorMessage("")
				);
			} catch (err) {
				document.cookie = `isPasswordConfirmed=${false}; path=/; max-age=${
					60 * 60 * 24
				};`;
				// @ts-ignore
				if (err.response.status === 400) {
					setErrorMessage("Account already exists");
				} else {
					// @ts-ignore
					setErrorMessage(`Unknown error: ${err.message}`);
				}
			}
		} else
			try {
				const data = await post("/users/login", {
					password: password,
					username: login || logged,
				});

				if (data?.data === false) {
					setErrorMessage("Wrong password");
					return;
				}
				document.cookie = `token=${data?.data?.token}; path=/; max-age=${
					60 * 60 * 24
				};`;
				document.cookie = `user=${login || logged}; path=/; max-age=${
					60 * 60 * 24
				};`;
				document.cookie = `isPasswordConfirmed=${
					data?.data?.isPasswordConfirmed
				}; path=/; max-age=${60 * 60 * 24};`;
				document.cookie = `currentDate=${Date.now()}; path=/; max-age=${
					60 * 60 * 24
				};`;
				document.cookie = `userId=${data?.data?.id}; path=/; max-age=${
					60 * 60 * 24
				};`;
				onLogin && onLogin(login || logged, data?.data?.id);
				setIsPasswordConfirmed(data?.data?.isPasswordConfirmed);
				!data?.data?.isPasswordConfirmed
					? onChange("activate", () => setErrorMessage(""))
					: setToken(data?.data?.token);
			} catch (err) {
				// @ts-ignore
				setErrorMessage(`Unknown error: ${err.message}`);
				console.log(err);
			}
	};

	return (
		<div className="login">
			<div className="login-container">
				{activate && (
					<span>
						ACTIVATE YOUR ACCOUNT,
						<br /> CHANGE PASSWORD
					</span>
				)}
				{!activate && (
					<Input
						value={login}
						onChange={setLogin}
						placeholder="login"
						className="login-input"
					/>
				)}
				<Input
					value={password}
					onChange={setPassword}
					placeholder="password"
					type="password"
					className="login-input"
				/>
				{(register || activate) && (
					<Input
						value={passwordRepeat}
						onChange={setPasswordRepeat}
						placeholder="repeat password"
						type="password"
						className="login-input"
					/>
				)}
				<Button onClick={handleOnClick}>
					{register ? "Register" : "Login"}
				</Button>
				<div className="login-container__text">
					{(register || activate) && (
						<span onClick={() => onChange("chat", () => setErrorMessage(""))}>
							{register && "Come back to chat"}
						</span>
					)}
				</div>
				{errorMessage && (
					<div className="login-container__wrong">
						<span>{errorMessage}</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default LogIn;
