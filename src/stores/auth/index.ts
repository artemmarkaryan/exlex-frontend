import { atom } from "jotai"

export const tokenAtom = atom<string | null, [string], void>(null, (get, set, update) => {
    set(tokenAtom, update)
})

export const isAuthorizedAton = atom((get) => !!get(tokenAtom))
