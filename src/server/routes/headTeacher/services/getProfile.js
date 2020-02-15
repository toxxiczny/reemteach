import { HeadTeacher } from '@database'

export default async (req, res, next) => {
    try {
        const { id, email } = req.user
        const headTeacher = await HeadTeacher.findOne({
            where: {
                id
            },
            attributes: ['name', 'surname', 'age']
        })
        if (headTeacher) {
            const { name, surname, age } = headTeacher
            const isActivated = !!(name && surname && age)
            res.send({
                email,
                name,
                surname,
                age,
                isActivated
            })
        }
    } catch (error) {
        next(error)
    }
}
