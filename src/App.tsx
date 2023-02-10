import React from "react";
import {Route, Routes} from "react-router-dom";

import Layout from "./components/widgets/Layout/Layout";
import Main from "./pages/Main";
import Todos from "./pages/Todos";

const App: React.FC = (props: any) => {

    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Main/>} />
                <Route path="todos" element={<Todos items={props.items}/>} />
            </Route>
        </Routes>
    )
}

export default App
