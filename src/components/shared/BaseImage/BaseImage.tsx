import React, {memo, useEffect, useState} from 'react';

import {classes} from "../../../core/helpers/classes";
import styles from "./BaseImage.module.scss";

interface IProps {
    name: string;
    src: string;
    className?: string;
}

const BaseImage: React.FC<IProps> = memo(({name, src, className}) => {
    const [state, setState] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setState(true);
        }, 500);
    }, []);

    return (
        <img src={src} alt={name || "image icon"} className={classes(styles.BaseImage, className || "", {[styles.shown]: state})} />
    );
});

export default BaseImage;
