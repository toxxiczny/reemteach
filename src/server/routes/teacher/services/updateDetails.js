import { check } from 'express-validator'

import { detectSanitization, detectWhiteSpaces } from '@utils'

export default async (req, res, next) => {
    try {
        const { name, surname, age, description, subject } = req.body
        await req.user.update({
            name,
            surname,
            age,
            description,
            subject
        })
        res.send({
            successMessage: 'Pomyślnie zaktualizowano profil!'
        })
    } catch (error) {
        next(error)
    }
}

export const validation = () => [
    check('name')
        .trim()
        .notEmpty()
        .withMessage('Wprowadź imię!')
        .bail()
        .custom(detectWhiteSpaces)
        .withMessage('Wprowadź poprawne imię!')
        .bail()
        .custom(detectSanitization)
        .withMessage('Imię zawiera niedozwolone znaki!'),
    check('surname')
        .trim()
        .notEmpty()
        .withMessage('Wprowadź nazwisko!')
        .bail()
        .custom(detectWhiteSpaces)
        .withMessage('Wprowadź poprawne nazwisko!')
        .bail()
        .custom(detectSanitization)
        .withMessage('Nazwisko zawiera niedozwolone znaki!'),
    check('age')
        .trim()
        .notEmpty()
        .withMessage('Wprowadź wiek!')
        .bail()
        .isInt()
        .withMessage('Wprowadź poprawny wiek!')
        .bail()
        .isInt({ min: 24, max: 100 })
        .withMessage('Wiek musi mieścić się między 24 a 100!'),
    check('description')
        .trim()
        .notEmpty()
        .withMessage('Wprowadź opis siebie!')
        .bail()
        .custom(detectSanitization)
        .withMessage('Opis siebie zawiera niedozwolone znaki!'),
    check('subject')
        .trim()
        .notEmpty()
        .withMessage('Zaznacz przedmiot przewodni!')
        .bail()
        .custom(detectSanitization)
        .withMessage('Przedmiot przewodni zawiera niedozwolone znaki!')
]
