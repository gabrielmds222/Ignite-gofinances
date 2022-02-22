import React, { createContext, ReactNode, useContext } from 'react';
// import { Alert } from 'react-native';
import * as AuthSession from 'expo-auth-session';

interface AuthProviderProps {
    children: ReactNode;
}

interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}
interface IAuthContextData {
    user: User;
    singInWithGoogle(): Promise<void>;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({children}: AuthProviderProps) {
    const user = {
        id: '12232312',
        name: 'Gabriel Medeiros',
        email: 'fulano@email.com',
    }

    async function singInWithGoogle() {
        try { 
            const CLIENT_ID = '620871080151-reau79nl9bgfgu0bdpkdvs82b4m3k2he.apps.googleusercontent.com';
            const REDIRECT_URI = 'https://auth.expo.io/@gabrielmeds/gofinances';
            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id${CLIENT_ID}&redirect_uri${REDIRECT_URI}&response_type${RESPONSE_TYPE}&scope${SCOPE}`;

            const response = await AuthSession.startAsync({ authUrl });
            console.log(response);

        } catch (error) {
            throw new Error(error);
          }
    }

    return(
        <AuthContext.Provider value={{ 
            user,
            singInWithGoogle }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);

    return context
}

export { AuthProvider, useAuth}