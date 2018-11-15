import axios from 'axios';

import { LOGIN } from './types';

export const loginOrRegisterUser = (user) => dispatch => {
    axios.post(`http://localhost:4200/users/login/${user.userID}`, user)
    .then(res =>{
        dispatch({
            type: LOGIN,
            payload: res.data
        })
    })
    .catch(
        dispatch({
            type: LOGIN,
            payload: null
        })
    )
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGIN,
        payload: null
    })
}