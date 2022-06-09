import { useState } from "react";

const useLogIn = () => {
	const [login, setLogin] = useState<string>("admin");
	const [password, setPassword] = useState<string>("admin");
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

export default useLogIn;
