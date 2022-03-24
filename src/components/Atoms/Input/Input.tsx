import React from "react";
import "./Input.scss";

type Props = {
	value: string;
	onChange: Function;
	className?: string;
	placeholder?: string;
};

const Input = (props: Props) => {
	const { onChange, value, className, placeholder } = props;
	return (
		<div className={`input ${className || ""}`}>
			<input
				value={value}
				placeholder={placeholder}
				onChange={(e) => onChange(e.target.value)}
			/>
		</div>
	);
};

export default Input;
