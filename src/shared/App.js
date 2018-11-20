import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { renderRoutes } from 'react-router-config';
import { routes } from '../shared/routes'
import './App.css';

export default class App extends Component {
    render() {
        return (
            <div className="app">
                {renderRoutes(routes)}
                {/* <Switch>
                    {routes.map(({ path, exact, component: C, ...rest }) => (
                        <Route
                            key={path}
                            path={path}
                            exact={exact}
                            render={(props) => (
                                <C {...props} {...rest} />
                            )}
                        />
                    ))} */}
                    {/* <Route exact path='/thanks' component={Thanks} />
                    <Route path='/' component={Payment} />default route at the end */}
                {/* </Switch> */}
            </div>
        )
    }
}