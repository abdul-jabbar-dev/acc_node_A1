const fs = require('fs')
module.exports.getRandomUser = async (req, res) => {
    const getDeta = await fs.readFileSync('api/api.fake.json')
    const deta = await JSON.parse(getDeta)
    const rendomNumber = deta[Math.floor(Math.random() * deta.length)]
    res.status(200).json(rendomNumber)
}

module.exports.getAllUsers = async (req, res) => {
    const getDeta = await fs.readFileSync('api/api.fake.json')
    const deta = await JSON.parse(getDeta)
    const { count } = req.query
    if (count) {
        res.status(200).send(deta.splice(0, count))
    } else {
        res.status(200).send(deta)
    }
}
module.exports.deleteAUsers = async (req, res) => {
    const getDeta = await fs.readFileSync('api/api.fake.json')
    const deta = await JSON.parse(getDeta)
    const { count } = req.query
    if (count) {
        res.status(200).send(deta.splice(0, count))
    } else {
        res.status(200).send(deta)
    }
}