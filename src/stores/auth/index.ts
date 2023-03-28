import { atom } from "jotai"

export const tokenAtom = atom<string | null>(null)

export const isAuthorizedAtom = atom((get) => get(tokenAtom) !== null)
