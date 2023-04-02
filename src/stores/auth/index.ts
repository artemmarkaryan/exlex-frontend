import { TokenData } from "@/dict/Dict";
import { parseToken } from "@/util/utils";
import { atom, useAtom } from "jotai"
import jwt_decode from 'jwt-decode'

export const tokenDataAtom = atom((get): TokenData | null => parseToken(localStorage.getItem('token')))

export const isAuthenticatedAtom = atom((get) => localStorage.getItem('token') !== null);
