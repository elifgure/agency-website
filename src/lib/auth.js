import jwt from "jsonwebtoken"

export function verifyToken(token){
    try {
        return jwt.verify(token, processe.env.JWT_SECRET)
    } catch {
        return null
    }
}