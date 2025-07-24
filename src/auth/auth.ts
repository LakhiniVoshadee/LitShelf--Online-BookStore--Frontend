import {jwtDecode} from "jwt-decode";
import type {UserData} from "../model/UserData.ts";

export const isTokenExpired = (token: string) => {
    try {
        const {exp} = jwtDecode(token); //decode the token to get the expiration time
        if (!exp) {
            return true;
        }
        return Date.now() >= exp * 1000;
    } catch (error) {
        console.log(error);
        return true;
    }

}

export const getUserFromToken = (token: string) => {
    return  jwtDecode<UserData>(token);

}