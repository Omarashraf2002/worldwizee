import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext()
/* eslint-disable react/prop-types*/

const initialState = {
    user: null,
    isAuthenticaed: false
}
function reducer(state,action) {
    switch(action.type) {
        case 'login' :
            return {
                ...state,
                user: action.payload,
                isAuthenticaed: true
            }
        case 'logout':
            return {
                ...state,
                user: null,
                isAuthenticaed: false
            }
            default: throw new Error('Unknown action')
    }
}
const FAKE_USER = {
    name: "Jack",
    email:"Jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz"
}
function AuthProvider({children}) {
    const [{user,isAuthenticaed}, dispatch] = useReducer(reducer, initialState)

    function login(email,password) {
        if(email === FAKE_USER.email && password === FAKE_USER.password) dispatch({type:'login', payload: FAKE_USER})
    }
    function logout() {
        dispatch({type:'logout'})
    }

    return <AuthContext.Provider value={{user, isAuthenticaed,login, logout}}>{children}</AuthContext.Provider>
}

function useAuth() {
    const context = useContext(AuthContext)
    if(context === undefined) throw new Error("Auth Context was used outside AuthProvider")
        return context;

}

export {
    AuthProvider,useAuth
}