import React, {useState} from 'react';
import {NavLink, Outlet} from "react-router-dom";

const Layout = () => {
    const [user, setUser] = useState(false);
    const logoutHandler = () => {
        setUser(prev => !prev);
    }

    return (
        <div className="bg-white-blue min-h-screen">
            <div className="bg-blue shadow-gray-100">
                <div className="container mx-auto flex justify-between py-8 px-8 mb-10">
                    <div className="flex gap-6">
                        <NavLink to={'/'} className="text-primary-blue font-bold">Главная</NavLink>
                        <NavLink to={'/todos'} className="text-primary-blue font-bold">Todos</NavLink>
                    </div>
                    <span className="text-primary-blue font-bold cursor-pointer" onClick={logoutHandler}>
                        {user ? 'Выйти' : 'Войти'}
                    </span>
                </div>
            </div>
            <div className="container mx-auto">
                <Outlet/>
            </div>
        </div>
    );
};

export default Layout;
