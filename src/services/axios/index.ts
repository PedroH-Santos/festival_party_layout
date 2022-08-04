
import axios from "axios";
import { parseCookies } from "nookies";
export function getAPIClient(ctx?: any) {
    const { 'festivalParty.token': token } = parseCookies(ctx);
    console.log(process.env.API_URL);
    const api = axios.create({
        baseURL: process.env.API_URL,
    })

    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return api;
}