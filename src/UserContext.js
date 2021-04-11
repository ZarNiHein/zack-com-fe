import React, {createContext} from 'react'

const UserContext = createContext(true);

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;

export default UserContext;