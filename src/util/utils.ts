import { TokenData } from '@/types/auth';
import jwtDecode from 'jwt-decode';

export const parseToken = (token: string | null): TokenData | null => {
    if (token === null) {
        console.log('null token', token);
        return null;
    }

    try {
        return typeof token === 'string' ? jwtDecode<TokenData>(token) : null;
    } catch (error) {
        console.log('data from token', error);
        return null;
    }
};
