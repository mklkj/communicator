import React, { useContext } from "react";
import "./App.scss";
import Main from "./components/Organisms/Main/Main";
import useApp from "./helpers/useApp";
import { AuthContext } from "./components/Organisms/Login/auth";

const App = () => {
	const {
		messages,
		setMessages,
		friends,
		isLoggedIn,
		setLogIn,
		currentUser,
		setCurrentUser,
	} = useApp();
	const { token } = useContext(AuthContext);

	console.log(currentUser);

	console.log(token);
	return (
		<div className="app">
			<Main
				type={token ? `chat` : `login`}
				data={{
					messages,
					setMessages,
					friends,
					setLogIn,
					currentUser,
					setCurrentUser,
				}}
			/>
		</div>
	);
};

export default App;
