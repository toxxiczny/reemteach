import { check } from 'express-validator'

export default (_, res, next) => {
    try {
        res.clearCookie('token', {
            secure: !process.env.NODE_ENV === 'development',
            httpOnly: true,
            sameSite: true
        }).send({
            success: true
        })
    } catch (error) {
        next(error)
    }
}

export const validation = () => [
    check('token')
        .not()
        .isEmpty()
]
