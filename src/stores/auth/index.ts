import { TokenData } from '@/types/auth';
import { parseToken } from '@/util/utils';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const tokenAtom = atomWithStorage<string | null>('token', null);
export const tokenDataAtom = atom((get): TokenData | null =>
    parseToken(localStorage.getItem('token')),
);
export const isAuthenticatedAtom = atom(
    (get) => localStorage.getItem('token') !== null,
);
