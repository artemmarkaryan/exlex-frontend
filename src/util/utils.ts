import { tokenData } from "@/stores/auth"
import jwt_decode from 'jwt-decode'

export const parseToken = (token: string | null): tokenData => {
    if (token === null) {
        return null
    }

    try {
        return typeof token === 'string' ? jwt_decode<tokenData>(token) : null
    } catch (error) {
        console.log("data from token", error)
        return null
    }
}
