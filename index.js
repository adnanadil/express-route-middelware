const express = require("express")

const app = express()

const friends = [
    {
        name: "Adnan Adil",
        id: 0
    },
    {
        name: "Brain Tracy",
        id: 1
    }
]

app.get('/', (req, res) => {
    res.send('Hello there')
})

app.get('/friends', (req,res) => {
    // By default express knows what we are sending but to have consistency 
    // we will be using res.json() to send json.

    // Each block of code can only have one response or else we get an error on the server side. 
    res.json(friends)
})

// How do we handle parameters with the link 
// You can get more details in this link: https://expressjs.com/en/guide/routing.html
app.get('/friends/:value', (req,res) => {
    const id = req.params.value 
    console.log(`This is the value which is sent ${id}`)

    // If you don't send a response the will keep hanging/loading
    res.json(friends[id])
})

app.listen(3000, () => {
    console.log("Hello World")
})