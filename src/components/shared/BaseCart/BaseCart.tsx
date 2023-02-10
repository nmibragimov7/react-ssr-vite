import React, {ReactNode} from 'react';

import BaseButton from "../BaseButton/BaseButton";
import {classes} from "../../../core/helpers/classes";
import styles from "./BaseCart.module.scss";

interface IProps {
    title: string;
    description?: string;
    children?: ReactNode;
    className?: string;
    action?: string;
    actionHandler?: () => void
}

const BaseCart: React.FC<IProps> = ({
                                        title,
                                        description,
                                        children,
                                        className,
                                        action,
                                        actionHandler
                                    }) => {
    return (
        <div className={classes(styles.BaseCart, className || "")}>
            <div className={"text-xl min-h-[80px] p-4"}>
                {title}
            </div>
            <div className={"w-full h-px bg-gray-100"} />
            {children}
            {
                !children && <div className={"p-4"}>
                    {description}
                    <BaseButton onClick={actionHandler}>{action}</BaseButton>
                </div>
            }
        </div>
    );
};

export default BaseCart;
