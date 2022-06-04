import React from "react";
import "./FriendItem.scss";
import {Person} from "../../../helpers/useApp";

type Props = {
	value: Person
};

const FriendItem = (props: Props) => {
	const { value } = props;
	return <div className="friend-item">{value.name}</div>;
};

export default FriendItem;
