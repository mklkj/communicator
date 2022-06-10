import React, { useContext } from "react";
import "./App.scss";
import { AuthContext } from "./components/Organisms/Login/auth";
import Main from "./components/Organisms/Main/Main";
import useApp from "./helpers/useApp";

const App = () => {
	const { token } = useContext(AuthContext);

	const getCookie = (name: string) => {
		var nameEQ = name + "=";
		var ca = document.cookie.split(";");
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) === " ") c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
		}
		return null;
	};

	const {
		messages,
		setMessages,
		friends,
		isLoggedIn,
		setLogIn,
		currentUser,
		setCurrentUser,
		type,
		setType,
		loggedUserData,
		setLoggedUserData,
	} = useApp(
		getCookie("token") || (token as string),
		getCookie("user") as string
	);

	console.log(currentUser);
	return (
		<div className="app">
			<Main
				type={type}
				data={{
					messages,
					setMessages,
					friends,
					setLogIn,
					currentUser,
					setCurrentUser,
					setType,
					loggedUserData,
					setLoggedUserData,
					// handleOnLoginCookie,
				}}
			/>
		</div>
	);
};

export default App;
