import React, { useContext } from "react";
import "./App.scss";
import { AuthContext } from "./components/Organisms/Login/auth";
import Main from "./components/Organisms/Main/Main";
import useApp, { getCookie } from "./helpers/useApp";

const App = () => {
	const { token, isPasswordConfirmed } = useContext(AuthContext);

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
		currentFriend,
		setCurrentFriend,
	} = useApp(token as string, isPasswordConfirmed);

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
					currentFriend,
					setCurrentFriend,
					isPasswordConfirmed,
					// handleOnLoginCookie,
				}}
			/>
		</div>
	);
};

export default App;
