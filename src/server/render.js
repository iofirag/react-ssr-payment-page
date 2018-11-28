import { renderToString } from "react-dom/server"
import App from '../shared/App'
import React from 'react'
import serialize from "serialize-javascript"
import { StaticRouter } from "react-router-dom"
import { Provider } from 'mobx-react'

export default (pathname, store, context) => {
    const markup = renderToString(
        <Provider store={store}>
            <StaticRouter location={pathname} context={context}>
                <App />
            </StaticRouter>
        </Provider>
    );
    
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <title>SSR with RR</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"/>
                <link rel="stylesheet" href="/styles.css">
                <script src="/bundle.js" defer></script>
                <script>
                    // serialize empty store
                    window.INITIAL_STATE = ${serialize(store)}
                </script>
            </head>
            <body>
                <div id="app">${markup}</div>
            </body>
        </html>`;
}