const express = require('express')
const userRoute = express.Router()
const { getRandomUser, getAllUsers, deleteAUsers,saveAUsers } = require('../Controlar/user.controls')

userRoute.get('/random', getRandomUser)
userRoute.get('/all', getAllUsers)
userRoute.post('/save', saveAUsers)
userRoute.delete(':id', deleteAUsers)



module.exports = userRoute