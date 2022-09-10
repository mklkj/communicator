import React, { useEffect, useState } from "react";
import { getCookie } from "../../../helpers/useApp";
import Button from "../../Atoms/Button/Button";
import "./Header.scss";

type Props = {
	className?: string;
	visible: { friendsVisible: boolean };
	onClick: {
		handleOnHeaderClick: () => void;
		handleOnSignOutClick: () => void;
		setType: Function;
	};
	text?: string;
};

const Header = (props: Props) => {
	const { className, onClick, visible, text } = props;
	const { friendsVisible } = visible;
	const { handleOnHeaderClick, handleOnSignOutClick, setType } = onClick;
	const [time, setTime] = useState<any>();
	const getTime = () => {
		const now = new Date();
		const timestamp = new Date(parseInt(getCookie("currentDate") as string));
		const timeNow = (now.getTime() - timestamp.getTime()) / 1000;
		let h: number | string = Math.floor(timeNow / 3600); // get hours
		let m: number | string = Math.floor((timeNow - h * 3600) / 60); // get minutes
		let s: number | string = Math.floor(timeNow - h * 3600 - m * 60); //  get seconds
		if (h < 10) h = "0" + h;
		if (m < 10) m = "0" + m;
		if (s < 10) s = "0" + s;
		setTime(`${h}:${m}:${s}`);
	};

	useEffect(() => {
		const interval = setInterval(getTime, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

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
			<div>
				<div>{text ? text : "Messenger"}</div>
				{time && <div>Czas pracy {time}</div>}
			</div>
			<div>
				{text === "admin" && (
					<Button onClick={() => setType("register")} className="button-margin">
						Create new user
					</Button>
				)}
				<Button onClick={handleOnSignOutClick}>Sign Out</Button>
			</div>
		</form>
	);
};

export default Header;
