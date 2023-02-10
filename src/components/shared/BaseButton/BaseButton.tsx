import React from 'react';

import {classes} from "../../../core/helpers/classes";
import styles from './BaseButton.module.scss';

export enum BUTTON {
    PRIMARY = "primary",
    OUTLINE = "outline"
}

interface IProps {
    type?: BUTTON;
    disabled?: boolean;
    className?: string;
    children?: React.ReactNode;
    onClick?: () => void;
}

const BaseButton: React.FC<IProps> = (props) => {
    const { type = BUTTON.PRIMARY, disabled = false, className, children, onClick } = props;

    return (
        <button
            disabled={disabled}
            className={classes(styles.BaseButton, className || '', styles[type])}
            onClick={onClick}
        >
            { children }
        </button>
    );
};

export default BaseButton;
