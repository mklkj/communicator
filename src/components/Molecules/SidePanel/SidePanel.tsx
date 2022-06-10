import React from "react";
import FriendItem from "../../Atoms/FriendItem/FriendItem";
import "./SidePanel.scss";
import { Person } from "../../../helpers/useApp";

type Props = {
	className?: string;
	value?: string;
	visible: boolean;
	options: Person[];
	onClick: Function;
};

const SidePanel = (props: Props) => {
	const { className, options, visible, onClick, value } = props;
	const handleOnClick = (name: string) => {
		onClick(name);
	};
	return (
		<div
			className={`side-panel ${className} ${
				!visible ? `side-panel--hidden` : ``
			}`}
		>
			{options?.map((friend, key) => (
				<div key={key} onClick={() => handleOnClick(friend?._id)}>
					<FriendItem value={value} friend={friend} />
				</div>
			))}
		</div>
	);
};

export default SidePanel;
