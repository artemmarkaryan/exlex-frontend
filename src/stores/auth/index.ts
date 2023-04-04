import { TokenData } from '@/types/auth';
import { parseToken } from '@/util/utils';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const tokenAtom = atomWithStorage<string | null>(
    'token',
    localStorage.getItem('token'),
);

export const tokenDataAtom = atom((get): TokenData | null =>
    parseToken(get(tokenAtom)),
);

export const isAuthenticatedAtom = atom((get) => get(tokenAtom) !== null);
