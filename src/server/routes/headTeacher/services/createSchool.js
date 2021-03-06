import { check } from 'express-validator'
import moment from 'moment'

import { School, SchoolBell } from '@database'

import { ApiError, detectSanitization } from '@utils'

export default async (req, res, next) => {
    try {
        if (req.user.school) {
            throw new ApiError(`Posiadasz już utworzoną szkołę!`, 409)
        }
        const { name, type, description, address, creationYear } = req.body
        if (
            await School.findOne({
                where: {
                    name
                }
            })
        ) {
            throw new ApiError(`Szkoła o nazwie ${name} istnieje już w systemie!`, 409)
        }
        await req.user.createSchool(
            {
                name,
                type,
                description,
                address,
                creationYear,
                schoolBells: [
                    {
                        from: '08:00',
                        to: '08:45',
                        isRecess: false
                    },
                    {
                        from: '08:45',
                        to: '08:50',
                        isRecess: true
                    },
                    {
                        from: '08:50',
                        to: '09:35',
                        isRecess: false
                    },
                    {
                        from: '09:35',
                        to: '09:55',
                        isRecess: true
                    },
                    {
                        from: '09:55',
                        to: '10:40',
                        isRecess: false
                    },
                    {
                        from: '10:40',
                        to: '10:45',
                        isRecess: true
                    },
                    {
                        from: '10:45',
                        to: '11:30',
                        isRecess: false
                    },
                    {
                        from: '11:30',
                        to: '11:40',
                        isRecess: true
                    },
                    {
                        from: '11:40',
                        to: '12:25',
                        isRecess: false
                    },
                    {
                        from: '12:25',
                        to: '12:30',
                        isRecess: true
                    },
                    {
                        from: '12:30',
                        to: '13:15',
                        isRecess: false
                    },
                    {
                        from: '13:15',
                        to: '13:20',
                        isRecess: true
                    },
                    {
                        from: '13:20',
                        to: '14:05',
                        isRecess: false
                    },
                    {
                        from: '14:05',
                        to: '14:10',
                        isRecess: true
                    },
                    {
                        from: '14:10',
                        to: '14:55',
                        isRecess: false
                    },
                    {
                        from: '14:55',
                        to: '15:00',
                        isRecess: true
                    },
                    {
                        from: '15:00',
                        to: '15:45',
                        isRecess: false
                    },
                    {
                        from: '15:45',
                        to: '15:50',
                        isRecess: true
                    },
                    {
                        from: '15:50',
                        to: '16:35',
                        isRecess: false
                    }
                ]
            },
            {
                include: SchoolBell
            }
        )
        res.send({
            successMessage: `Pomyślnie utworzono szkołę ${name} w systemie!`
        })
    } catch (error) {
        next(error)
    }
}

export const validation = () => [
    check('name')
        .trim()
        .notEmpty()
        .withMessage('Wprowadź nazwę szkoły!')
        .bail()
        .custom(detectSanitization)
        .withMessage('Nazwa szkoły zawiera niedozwolone znaki!'),
    check('type')
        .trim()
        .notEmpty()
        .withMessage('Zaznacz rodzaj szkoły!')
        .bail()
        .custom(detectSanitization)
        .withMessage('Rodzaj szkoły zawiera niedozwolone znaki!'),
    check('description')
        .trim()
        .notEmpty()
        .withMessage('Wprowadź opis szkoły!')
        .bail()
        .custom(detectSanitization)
        .withMessage('Opis szkoły zawiera niedozwolone znaki!'),
    check('address')
        .trim()
        .notEmpty()
        .withMessage('Wprowadź adres szkoły!')
        .bail()
        .custom(detectSanitization)
        .withMessage('Adres szkoły zawiera niedozwolone znaki!'),
    check('creationYear')
        .trim()
        .notEmpty()
        .withMessage(`Wprowadź rok utworzenia szkoły (np. ${moment().format('YYYY')})!`)
        .bail()
        .custom(creationYear => {
            if (!moment(creationYear, 'YYYY', true).isValid()) {
                throw new Error('')
            } else {
                return creationYear
            }
        })
        .withMessage(`Wprowadź poprawny rok utworzenia szkoły (np. ${moment().format('YYYY')})!`)
]
