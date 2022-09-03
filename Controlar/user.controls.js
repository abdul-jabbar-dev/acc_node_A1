const fs = require('fs')
module.exports.getRandomUser = async (req, res) => {
    const deta = await req.fsDeta
    console.log(deta)
    const rendomNumber = deta[Math.floor(Math.random() * deta.length)]
    res.status(200).json(rendomNumber)
}

module.exports.getAllUsers = async (req, res) => {
    const deta = await req.fsDeta
    const { count } = req.query
    if (count) {
        res.status(200).send(deta.splice(0, count))
    } else {
        res.status(200).send(deta)
    }
}

module.exports.saveAUsers = async (req, res) => {

    const user = req.body
    const errorList = []
    if (!user?.name?.length > 0) {
        errorList.push('name')
    } if (!user?.contact?.length > 0) {
        errorList.push('contact')
    } if (!user?.photoUrl?.length > 0) {
        errorList.push('photoUrl')
    } if (!user?.gender?.length > 0) {
        errorList.push('gender')
    } if (!user?.id > 0) {
        errorList.push('id')
    } if (!user?.address?.length > 0) {
        errorList.push('address')
    }
    if (errorList.length > 0) {
        res.status(400).send(errorList.join(' ') + " nedded")
        res.end()
        return
    }
    const deta = await req.fsDeta
    if (deta?.find(e => e?.id === user?.id)) {
        res.status(400).send(user?.id + " this user id already exest")
    } else {
        deta.push(user)
        try {
            await fs.writeFileSync('api/api.fake.json', JSON.stringify(deta))
            res.send(user)
        } catch (error) {
            res.send('internal servre error')
        }
    }

}

module.exports.deleteAUsers = async (req, res) => {
    const deta = await req.fsDeta
    const { userid } = req.params
    const deletedUser = deta.find(det => det.id == parseInt(userid))
    if (deletedUser) {
        fs.writeFileSync('api/api.fake.json', JSON.stringify(deta.filter(i => i.id != parseInt(userid))))
        res.send({ status: 200, deletedUser: deletedUser })
    } else {
        res.send({ status: 404, message: "user not found" })
    }

}

module.exports.bulkUpdate = async (req, res) => {
    let STdeta = await req.fsDeta
    let STdeta2 =  STdeta
    const bulkUpdate = req.body

    bulkUpdate.forEach(uid => {
        STdeta2.filter((ui) => {
            if (ui.id === uid.id) {
                const detas = req.updatedKeys.filter(e => e != 'id')
                detas.forEach(upID => {
                    ui[upID] = uid[upID]
                })

            }
        })

    })
    fs.writeFileSync('api/api.fake.json', JSON.stringify(STdeta2))
}

module.exports.updateAUsers = async (req, res) => {
    const readFS = await req.fsDeta
    const userNewUpdate = req.body
    const { userid } = req.params
    let flag = false;
    readFS.forEach(User => {
        if (User.id === parseInt(userid)) {
            User.name = userNewUpdate.name || User.name
            User.email = userNewUpdate.email || User.email
            User.contact = userNewUpdate.contact || User.contact
            User.gender = userNewUpdate.gender || User.gender
            User.photoUrl = userNewUpdate.photoUrl || User.photoUrl
            flag = true
        }
    })
    if (flag === true) {
        fs.writeFileSync('api/api.fake.json', JSON.stringify(readFS))
        res.status(200).send(readFS.find(fu => fu.id === parseInt(userid)))
    } else {
        res.status(402).json("user id invalid")
    }
}