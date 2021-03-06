import { check } from 'express-validator'
import nodemailer from 'nodemailer'
import crypto from 'crypto'

import { GradingSystem, Teacher } from '@database'

import { ApiError } from '@utils'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_USERNAME,
        pass: process.env.NODEMAILER_PASSWORD
    }
})

export default async (req, res, next) => {
    try {
        const { name, surname, school } = req.user
        const { email } = req.body
        const teacher = await Teacher.findOne({
            where: {
                email
            }
        })
        if (!teacher) {
            const password = crypto.randomBytes(20).toString('hex')
            const teacher = await Teacher.create(
                {
                    email,
                    password,
                    gradingSystems: [
                        {
                            grade: '5',
                            from: 91,
                            to: 100
                        },
                        {
                            grade: '4',
                            from: 76,
                            to: 90
                        },
                        {
                            grade: '3',
                            from: 51,
                            to: 75
                        },
                        {
                            grade: '2',
                            from: 34,
                            to: 50
                        },
                        {
                            grade: '1',
                            from: 0,
                            to: 33
                        }
                    ]
                },
                {
                    include: GradingSystem
                }
            )
            await school.addTeacher(teacher)
            const mailOptions = {
                from: process.env.NODEMAILER_USERNAME,
                to: email,
                subject: `Konto nauczycielskie w aplikacji Reemteach`,
                html: `
                    <h2>Dyrektor ${name} ${surname} utworzył Twoje konto nauczycielskie!</h2>
                    <h3>Zaloguj się, uzupełnij dane personalne i ustaw nowe hasło!</h3>
                    <p>E-mail: ${email}</p>
                    <p>Hasło: ${password}</p>
        		`
            }
            transporter.sendMail(mailOptions, async (error, info) => {
                try {
                    if (error || !info) {
                        throw new ApiError(
                            'Wystąpił niespodziewany problem przy wysyłaniu e-maila z danymi do zalogowania się na konto nauczycielskie!',
                            500
                        )
                    }
                    res.send({
                        successMessage: `Na adres ${email} został wysłany e-mail z danymi do zalogowania się na konto nauczycielskie!`
                    })
                } catch (error) {
                    next(error)
                }
            })
        } else {
            if (await school.hasTeacher(teacher)) {
                throw new ApiError(
                    `Nauczyciel z adresem ${email} ma już konto w Twojej szkole!`,
                    409
                )
            }
            await school.addTeacher(teacher)
            const mailOptions = {
                from: process.env.NODEMAILER_USERNAME,
                to: email,
                subject: `Konto nauczycielskie w aplikacji Reemteach`,
                html: `
                    <h2>Dyrektor ${name} ${surname} dodał Cię do szkoły ${school.name}!</h2>
        		`
            }
            transporter.sendMail(mailOptions, async (error, info) => {
                try {
                    if (error || !info) {
                        throw new ApiError(
                            'Wystąpił niespodziewany problem przy wysyłaniu e-maila z informacją o dodaniu do szkoły!',
                            500
                        )
                    }
                    res.send({
                        successMessage: `Na adres ${email} został wysłany e-mail z informacją o dodaniu do szkoły!`
                    })
                } catch (error) {
                    next(error)
                }
            })
        }
    } catch (error) {
        next(error)
    }
}

export const validation = () => [
    check('email')
        .trim()
        .notEmpty()
        .withMessage('Wprowadź adres e-mail!')
        .bail()
        .isEmail()
        .withMessage('Wprowadź poprawny adres e-mail!')
        .normalizeEmail()
]
