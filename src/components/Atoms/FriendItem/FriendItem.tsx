import React from "react";
import "./FriendItem.scss";
import { Person } from "../../../helpers/useApp";

type Props = {
	friend: Person;
	value?: string;
};

const FriendItem = (props: Props) => {
	const { value, friend } = props;
	return (
		<div className={`friend-item ${value === friend?._id && "selected"}`}>
			{friend?.username}
		</div>
	);
};

export default FriendItem;
