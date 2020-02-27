import jwt from 'jsonwebtoken'
import { check } from 'express-validator'

import { Admin, HeadTeacher, School, Teacher, Student } from '@database'

export default (req, res, next) => {
    try {
        const clearCookie = () => {
            res.clearCookie('token', {
                secure: !process.env.NODE_ENV === 'development',
                httpOnly: true,
                sameSite: true
            }).send({
                role: 'guest'
            })
        }
        if (req.cookies.token) {
            jwt.verify(req.cookies.token, process.env.JWT_KEY, async (error, data) => {
                if (error) {
                    clearCookie()
                } else {
                    const { email, role } = data
                    if (role === 'admin') {
                        try {
                            const admin = await Admin.findOne({
                                where: {
                                    email
                                }
                            })
                            if (!admin) {
                                clearCookie()
                            } else {
                                res.send({
                                    role: 'admin'
                                })
                            }
                        } catch (error) {
                            next(error)
                        }
                    } else if (role === 'headTeacher') {
                        try {
                            const headTeacher = await HeadTeacher.findOne({
                                where: {
                                    email
                                },
                                include: {
                                    model: School
                                }
                            })
                            if (!headTeacher) {
                                clearCookie()
                            } else {
                                const { isActivated, school } = headTeacher
                                res.send({
                                    role: 'headTeacher',
                                    isActivated,
                                    hasSchool: !!school
                                })
                            }
                        } catch (error) {
                            next(error)
                        }
                    } else if (role === 'teacher') {
                        try {
                            const teacher = await Teacher.findOne({
                                where: {
                                    email
                                }
                            })
                            if (!teacher) {
                                clearCookie()
                            } else {
                                const { isActivated } = teacher
                                res.send({
                                    role: 'teacher',
                                    isActivated
                                })
                            }
                        } catch (error) {
                            next(error)
                        }
                    } else if (role === 'student') {
                        try {
                            const student = await Student.findOne({
                                where: {
                                    email
                                }
                            })
                            if (!student) {
                                clearCookie()
                            } else {
                                const { isActivated } = student
                                res.send({
                                    role: 'student',
                                    isActivated
                                })
                            }
                        } catch (error) {
                            next(error)
                        }
                    } else {
                        clearCookie()
                    }
                }
            })
        } else {
            res.send({
                role: 'guest'
            })
        }
    } catch (error) {
        next(error)
    }
}

export const validation = () => [
    check('token')
        .optional()
        .trim()
        .notEmpty()
        .bail()
        .isJWT()
]
