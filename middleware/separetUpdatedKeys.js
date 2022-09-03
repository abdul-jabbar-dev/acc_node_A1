module.exports.separetKeys = (req, res, next) => {
    const bulkUpdate = req.body
    req.updatedKeys = Object.keys(bulkUpdate[0])
    next()
}