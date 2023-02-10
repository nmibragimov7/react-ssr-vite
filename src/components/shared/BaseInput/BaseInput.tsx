import React, {ChangeEvent, memo} from 'react';

import styles from './BaseInput.module.scss';

interface IProps {
    name: string;
    value: string | number;
    type?: "text" | "number" | "password";
    placeholder?: string;
    onChange: (event: ChangeEvent<HTMLElement>) => void;
    className?: string;
}

const BaseInput: React.FC<IProps> = memo((props) => {
    const {
        name,
        value,
        type = "text",
        placeholder,
        onChange,
        className
    } = props;

    return (
        <>
            <input
                name={name}
                value={value}
                placeholder={placeholder}
                type={type}
                className={[styles.BaseInput, className].join(" ")}
                autoComplete={"new-password"}
                onChange={onChange}
            />
        </>
    );
});

export default BaseInput;
