export default async (req, res, next) => {
    try {
        const { email } = req.user
        res.send({
            email
        })
    } catch (error) {
        next(error)
    }
}
