const express = require('express')
const userRoute = express.Router()
const { getRandomUser, getAllUsers, deleteAUsers } = require('../Controlar/user.controls')

userRoute.get('/random', getRandomUser)
userRoute.get('/all', getAllUsers)
userRoute.delete(':id', deleteAUsers)



module.exports = userRoute