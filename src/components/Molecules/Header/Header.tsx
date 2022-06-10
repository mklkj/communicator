import React from "react";
import Button from "../../Atoms/Button/Button";
import "./Header.scss";

type Props = {
	className?: string;
	visible: { friendsVisible: boolean };
	onClick: {
		handleOnHeaderClick: () => void;
		handleOnSignOutClick: () => void;
	};
	text?: string;
};

const Header = (props: Props) => {
	const { className, onClick, visible, text } = props;
	const { friendsVisible } = visible;
	const { handleOnHeaderClick, handleOnSignOutClick } = onClick;

	return (
		<form className={`header ${className}`}>
			<div
				className={`header-menu ${
					friendsVisible ? "header-menu-x" : "header-menu-hamburger"
				}`}
				onClick={handleOnHeaderClick}
			>
				{friendsVisible ? <>❌</> : <>☰</>}
			</div>
			<div>{text ? text : "Messenger"}</div>
			<Button onClick={handleOnSignOutClick}>Sign Out</Button>
		</form>
	);
};

export default Header;
