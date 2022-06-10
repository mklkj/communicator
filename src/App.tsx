import React, { useContext } from "react";
import "./App.scss";
import { AuthContext } from "./components/Organisms/Login/auth";
import Main from "./components/Organisms/Main/Main";
import useApp, { getCookie } from "./helpers/useApp";

const App = () => {
	const { token } = useContext(AuthContext);

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
