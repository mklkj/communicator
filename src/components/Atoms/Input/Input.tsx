import React, { useState } from "react";
import "./Input.scss";

type Props = {
	value: string;
	onChange: Function;
	className?: string;
	placeholder?: string;
	type?: string;
};

const Input = (props: Props) => {
	const { onChange, value, className, placeholder, type } = props;
	const [show, setShow] = useState<boolean>(false);
	const showEye = type === "password";
	const showType = show ? "text" : "password";
	const checkType = showEye ? showType : type;

	return (
		<div className={`input ${className || ""}`}>
			<input
				value={value}
				placeholder={placeholder}
				type={checkType}
				onChange={(e) => onChange(e.target.value)}
			/>
			{showEye && (
				<>
					{show ? (
						<div className="eye" onClick={() => setShow(false)}>
							👓
						</div>
					) : (
						<div className="eye" onClick={() => setShow(true)}>
							👁️
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default Input;
