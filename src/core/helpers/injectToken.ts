import {InternalAxiosRequestConfig} from "axios";

export const injectToken = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    try {
        const token = localStorage.getItem("access-token");
        if (token) {
            config.headers!.Authorization = `Bearer ${token}`;
        }
        config.params = {
            ...config.params
        }
        return config;
    } catch (error: any) {
        throw new Error(error);
    }
};
