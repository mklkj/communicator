import { useState } from "react";

const useLogIn = () => {
	const [login, setLogin] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	return { login, password, setLogin, setPassword };
};

export default useLogIn;
