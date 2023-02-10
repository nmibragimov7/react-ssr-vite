import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {StaticRouter} from "react-router-dom/server";
// @ts-ignore
import App from './App'

export function render(url: string, _, props: any) {
    const html = ReactDOMServer.renderToString(
        <StaticRouter location={`/${url}`}>
            <App {...props} />
        </StaticRouter>
    )
    return {html}
}
