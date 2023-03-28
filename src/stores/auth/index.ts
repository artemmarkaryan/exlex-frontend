import { atom } from "jotai"
import jwt_decode from 'jwt-decode';

export interface tokenData {
    UserID: string,
    Email: string,
    Role: string
}

export const tokenAtom = atom<string | null>(null);
export const tokenDataAtom = atom((get): tokenData | null => {
    const t = get(tokenAtom);
    if (typeof t === 'string') {
        return jwt_decode(t)
    }  
    return null
});
export const isAuthenticatedAtom = atom((get) => get(tokenAtom) !== null);
