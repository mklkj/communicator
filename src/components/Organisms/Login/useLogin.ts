import { useState, useEffect } from "react";

const useLogin = (activate?: boolean, register?: boolean) => {
	const [login, setLogin] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [passwordRepeat, setPasswordRepeat] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");

	const handleReset = () => {
		setLogin("");
		setPassword("");
		setPasswordRepeat("");
	};

	useEffect(() => {
		handleReset();
	}, [activate, register]);

	return {
		login,
		password,
		setLogin,
		setPassword,
		passwordRepeat,
		setPasswordRepeat,
		handleReset,
		errorMessage,
		setErrorMessage,
	};
};

export default useLogin;
