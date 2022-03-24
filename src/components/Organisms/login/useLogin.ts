import { useState } from "react";

const useLogin = () => {
	const [login, setLogin] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	return { login, password, setLogin, setPassword };
};

export default useLogin;
