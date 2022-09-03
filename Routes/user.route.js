const express = require('express')
const userRoute = express.Router()
const { getRandomUser, getAllUsers, deleteAUsers, saveAUsers, updateAUsers } = require('../Controlar/user.controls')
const getReadData = require('../middleware/readData.fs')

userRoute.get('/random', getReadData, getRandomUser)


userRoute.get('/all', getReadData, getAllUsers)


userRoute.post('/save', getReadData, saveAUsers)


userRoute.patch('/update/:userid', getReadData, updateAUsers)


userRoute.delete('/delete/:userid', getReadData, deleteAUsers)



module.exports = userRoute