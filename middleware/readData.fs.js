const fs = require('fs')
const getReadData = async (req, res, next) => {
    const getDeta = await fs.readFileSync('api/api.fake.json')
    const deta = await JSON.parse(getDeta)
    req.fsDeta = await deta
    next()
}
module.exports = getReadData