import { TokenData } from '@/types/auth';
import jwt_decode from 'jwt-decode';

export const parseToken = (token: string | null): TokenData | null => {
    if (token === null) {
        return null;
    }

    try {
        return typeof token === 'string' ? jwt_decode<TokenData>(token) : null;
    } catch (error) {
        console.log('data from token', error);
        return null;
    }
};
