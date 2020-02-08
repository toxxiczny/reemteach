import { check } from 'express-validator'

export default (_, res) => {
    res.clearCookie('token', {
        secure: !process.env.NODE_ENV === 'development',
        httpOnly: true,
        sameSite: true
    }).send({
        success: true
    })
}

export const validation = () => [
    check('token')
        .not()
        .isEmpty()
]