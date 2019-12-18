import React from 'react'
import {Route,Redirect} from 'react-router-dom'

const PrivateRoute = ({component: Component, ...rest}) => {
    return(
        <Route
        render={props => {
            return localStorage.getItem('key') ? <Component {...rest}/> : <Redirect to='/login'/>
        }}
        />
    )
}
export default PrivateRoute