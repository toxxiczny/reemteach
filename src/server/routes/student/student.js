import { Router } from 'express'

import { authWithJwt, checkValidationResult } from '@middlewares'

import Services from './services'

const router = Router()

router.post(
    '/student/login',
    Services.login.validation(),
    checkValidationResult,
    Services.login.default
)

export default router
