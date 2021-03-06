export default async (req, res, next) => {
    try {
        const schoolBells = await req.user.school
            .getSchoolBells()
            .then(schoolBells =>
                schoolBells.sort(
                    (first, second) =>
                        new Date(`1970.01.01 ${first.from}`) - new Date(`1970.01.01 ${second.from}`)
                )
            )
        res.send({
            schoolBells
        })
    } catch (error) {
        next(error)
    }
}
