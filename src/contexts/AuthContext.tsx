import { createContext, ReactElement, useEffect, useState } from "react";
import { api } from "../services/api";
import { setCookie, parseCookies } from "nookies";
import Router from "next/router";
export const AuthContext = createContext({} as AuthContextType);

interface AuthContextType {
    isAuthenticated: Boolean;
    user: User | null;
    signIn: (data: SignInData) => Promise<void>

}

interface AuthContextProps {
    children: ReactElement
}

interface SignInData {
    email: string;
    password: string;
}

interface ResponseToken {
    token: string;
    user: User;
}


export function AuthProvider({ children }: AuthContextProps) {

    const [user, setUser] = useState<User | null>(null);
    const isAuthenticated = !!user;
    async function signIn({ email, password }: SignInData) {
        const response = await api.post<ResponseToken>('/session', {
            email,
            password
        });
        setCookie(undefined, 'festivalParty.token', response.data.token, {
            maxAge: 60 * 60 * 24 //1 day
        });
        setUser(response.data.user);
        Router.push('/list/today');
    }

    useEffect(() => {
        const { 'festivalParty.token' : token } = parseCookies();

        if(token){
            //buscar os dados do usuário atualizado backend
        }

    },[]);

    return (
        <AuthContext.Provider value={{ user, signIn, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}