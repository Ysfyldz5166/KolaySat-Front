/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */

import { createContext, useState } from "react";
import { loadLoginState, storeLoginState } from "./storage";

export const LoginContext = createContext()



export function LoginationContext({children}){

    const [login, setLogin] = useState(loadLoginState());

    const onLoginSuccess = (data) => {
        setLogin(data);
        storeLoginState(data);
    }

    const onLogotSuccess = () => {
        setLogin({id :0});
        storeLoginState({id : 0});
    }
    
    return (
    <LoginContext.Provider value={{
        ...login,
        onLoginSuccess,
        onLogotSuccess
    }}
    >
        {children}
    </LoginContext.Provider>
    );
}