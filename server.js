const express = require('express')
const userRoute = require('./Routes/user.route')
const server = express()
const PORT = 3000


server.use('/user', userRoute)



server.get('/', (req, res) => {
    res.send("<h1 style='text-align:center'>HOME</h1>")
})

server.listen(PORT, () => console.log(PORT, 'is running'))