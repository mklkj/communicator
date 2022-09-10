import React, { useState } from "react";
import { getCookie } from "../../../helpers/useApp";

interface DefaultState {
	token: null | string;
	setToken: React.Dispatch<React.SetStateAction<string | null>>;
	isPasswordConfirmed: boolean;
	setIsPasswordConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
}

const DEFAULT_STATE: DefaultState = {
	token: null,
	setToken: () => {},
	isPasswordConfirmed: false,
	setIsPasswordConfirmed: () => {},
};

export const AuthContext = React.createContext(DEFAULT_STATE);

interface Props {
	children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: Props) => {
	const [token, setToken] = useState<null | string>(null);
	const [isPasswordConfirmed, setIsPasswordConfirmed] = useState<boolean>(
		getCookie("isPasswordConfirmed") === undefined
			? true
			: getCookie("isPasswordConfirmed") === "true"
			? true
			: false
	);

	const value = {
		token,
		setToken,
		isPasswordConfirmed,
		setIsPasswordConfirmed,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
