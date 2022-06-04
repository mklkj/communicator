import { useState } from "react";

const useLogin = () => {
	const [login, setLogin] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [passwordRepeat, setPasswordRepeat] = useState<string>("");

	return {
		login,
		password,
		setLogin,
		setPassword,
		passwordRepeat,
		setPasswordRepeat,
	};
};

export default useLogin;
