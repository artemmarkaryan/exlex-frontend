import { TokenData } from "@/dict/Dict";
import { parseToken } from "@/util/utils";
import { atom, useAtom } from "jotai"
import jwt_decode from 'jwt-decode'

export const tokenAtom = atom<string | null>(null);

export const tokenDataAtom = atom((get): TokenData | null => parseToken(get(tokenAtom)))

export const isAuthenticatedAtom = atom((get) => get(tokenAtom) !== null);
