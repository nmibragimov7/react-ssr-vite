import React, {ReactNode, useEffect} from 'react';

import {classes} from "../../../core/helpers/classes";
import close from "../../../static/images/close.svg";
import styles from './BaseModal.module.scss';

interface IProps {
    children: ReactNode;
    state: boolean;
    setState: (value: boolean) => void;
}

const BaseModal: React.FC<IProps> = ({state, setState, children}) => {
    useEffect(() => {
        state ? document.body.style.overflowY = 'hidden' : document.body.style.overflowY = 'auto';
    }, [state]);
    // if (!state) {
    //     return null
    // }

    return (
        <div className={classes(styles.BaseModal, {[styles.BaseModalHidden]: !state}, {[styles.BaseModalShown]: state})}>
            <div className={"w-full h-full flex justify-center items-center my-10"}>
                <div className={classes(styles.BaseModalBody, {[styles.BaseModalBodyHidden]: !state}, {[styles.BaseModalBodyShown]: state})}>
                    <img
                        src={close}
                        alt="close"
                        className={"absolute top-4 right-4 cursor-pointer"}
                        onClick={() => setState(!state)}
                    />
                    {children}
                </div>
            </div>
        </div>
    );
};

export default BaseModal;
