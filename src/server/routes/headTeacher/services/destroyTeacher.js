import { check } from 'express-validator'

import { Teacher } from '@database'

import { ApiError } from '@utils'

export default async (req, res, next) => {
    try {
        const { id, email } = req.body
        const teacher = await Teacher.findOne({
            where: {
                id,
                email
            }
        })
        if (!teacher) {
            throw new ApiError(
                `Wystąpił niespodziewany problem przy usuwaniu nauczyciela ${email}`,
                409
            )
        }
        if (teacher.isActivated) {
            throw new ApiError(
                `Nauczyciel z adresem ${email} aktywował już swoje konto i nie możesz go usunąć!`,
                409
            )
        }
        await teacher.destroy()
        res.send({
            successMessage: `Pomyślnie usunięto nauczyciela ${email} z systemu!`
        })
    } catch (error) {
        next(error)
    }
}

export const validation = () => [
    check('id')
        .trim()
        .notEmpty()
        .bail()
        .isInt()
        .escape(),
    check('email')
        .trim()
        .notEmpty()
        .bail()
        .isEmail()
        .normalizeEmail()
]
