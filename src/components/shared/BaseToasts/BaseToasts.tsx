import React, {useCallback, useEffect, useState} from 'react';

import {classes} from "../../../core/helpers/classes";
import styles from "./BaseToasts.module.scss";

export let toast: any = null;
const DELAY = 5000;

interface Toast {
    id: string;
    title: string;
    type?: string;
}
interface IProps {
    toast: Toast;
    removeToast: (id: string) => void;
}

const BaseToast: React.FC<IProps> = ({
                                        toast,
                                        removeToast
                                    }) => {
    const [state, setState] = useState(false);
    useEffect(() => {
       setTimeout(() => {
           setState(true);
       }, 300);
    }, [])

    return (
        <>
            <div className={classes(styles.BaseToast, styles[toast.type || ""], {[styles.shown]: state})} onClick={() => removeToast(toast.id)}>
                <p className={styles.title}>{toast.title}</p>
            </div>
        </>
    )
}

const BaseToasts: React.FC = () => {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const showToast = useCallback((title: string, type?: string) => {
        const newToast = {
            id: new Date().toISOString(),
            title,
            type
        }
        setToasts(prev => ([
            ...prev,
            newToast
        ]));

        setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== newToast.id));
        }, DELAY);
    }, []);
    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }
    useEffect(() => {
        toast = {
            success: (message: string) => {
                showToast(message, 'success');
            },
            error: (message: string) => {
                showToast(message, 'error');
            },
            info: (message: string) => {
                showToast(message, 'info');
            },
            warning: (message: string) => {
                showToast(message, 'warning');
            }
        }

    }, [showToast]);

    return (
        <div className={classes(styles.BaseToasts)}>
            {toasts.map((toast: Toast) => (
                <BaseToast key={toast.id} toast={toast} removeToast={removeToast}/>
            ))}
        </div>
    );
};

export default BaseToasts;
