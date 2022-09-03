const express = require('express')
const userRoute = express.Router()
const { getRandomUser, getAllUsers, deleteAUsers, saveAUsers, updateAUsers, bulkUpdate } = require('../Controlar/user.controls')
const getReadData = require('../middleware/readData.fs')
const { separetKeys } = require('../middleware/separetUpdatedKeys')

// Get a random user deta
userRoute.get('/random', getReadData, getRandomUser)

/*
    get all user deta
    -limited deta by quary {count} examp: /all?count=5

*/
userRoute.get('/all', getReadData, getAllUsers)

/*
    requared id,name,email,contact,addres,photoUrl
*/
userRoute.post('/save', getReadData, saveAUsers)


userRoute.patch('/update/:userid', getReadData, updateAUsers)

/*
[
 {
   "id":3,
   "name":"*****",
   "email":"****.com"
  }

] */
userRoute.patch('/bulk-update', getReadData,separetKeys, bulkUpdate)


userRoute.delete('/delete/:userid', getReadData, deleteAUsers)



module.exports = userRoute