import { HeadTeacher } from '@database'

export default async (_, res, next) => {
    try {
        let headTeachers = await HeadTeacher.findAll({
            attributes: ['id', 'email', 'name', 'surname', 'age', 'createdAt']
        })
        headTeachers = headTeachers.map(({ id, email, name, surname, age, createdAt }) => {
            const isActivated = !!(name && surname && age)
            return {
                id,
                email,
                name,
                surname,
                age,
                createdAt,
                isActivated
            }
        })
        res.send({
            headTeachers
        })
    } catch (error) {
        next(error)
    }
}
