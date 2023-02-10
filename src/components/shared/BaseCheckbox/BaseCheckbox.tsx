import React, {memo} from 'react';

import {classes} from "../../../core/helpers/classes";
import styles from './BaseCheckbox.module.scss';

interface IProps {
    name: string;
    classNames?: string;
    children: string;
    value: boolean;
    setValue: (value: boolean) => void;
}

const BaseCheckbox: React.FC<IProps> = memo((props) => {
    const {
        name,
        classNames,
        children,
        value,
        setValue
    } = props;

    return (
        <div className={classes(styles.BaseCheckbox)}>
            <label
                htmlFor={name}
                className={"flex items-center cursor-pointer"}
            >
                <input
                    id={name}
                    type="checkbox"
                    className={"opacity-0 w-0 h-0"}
                    checked={value}
                    onChange={() => setValue(!value)}
                />
                <span className={classes(
                    "w-6 h-6 rounded-md border border-solid border-gray-100 mr-2.5 relative",
                    classNames || '',
                    {"after:absolute after:content-[''] after:translate-x-[-50%] after:translate-y-[-50%] after:rounded after:w-4 after:h-4 after:top-1/2 after:left-1/2 after:bg-primary-blue": value}
                )}></span>
                <span>{children}</span>
            </label>
        </div>
    );
});

export default BaseCheckbox;
