import { createContext, useState } from "react";


const UserContext = createContext()

function UserProverWrapper(props){
    // all the components wrapped insode the userwrapper can use these variables

    //create state here so you can use it anywhere in your app 
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null) 

    
    // pass in the key 
    return (
        <UserContext.Provider value={{user, setUser, error, setError}}>
            {props.children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProverWrapper}