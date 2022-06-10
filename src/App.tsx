import React, { useContext } from "react";
import "./App.scss";
import { AuthContext } from "./components/Organisms/Login/auth";
import Main from "./components/Organisms/Main/Main";
import useApp from "./helpers/useApp";

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
	} = useApp(token as string);

	console.log(currentUser);

	console.log(token);
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
				}}
			/>
		</div>
	);
};

export default App;
