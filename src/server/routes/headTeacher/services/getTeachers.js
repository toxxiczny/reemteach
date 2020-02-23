export default async (req, res, next) => {
    try {
        const teachers = await req.school.getTeachers({
            attributes: ['id', 'email', 'name', 'surname', 'age', 'isActivated', 'createdAt']
        })
        res.send({
            teachers
        })
    } catch (error) {
        next(error)
    }
}
