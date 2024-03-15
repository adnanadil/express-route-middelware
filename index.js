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

// This a middleware which we are using ... since the data that we get from the 
// web or client in the post request is json (that is when the client post/sends us data)
// we cannot read this in JS so we have to convert to JS and having this middleware 
// will do it without us having to convert the data into js 
app.use(express.json());

app.use((req,res,next) => {
    const start = new Date()
    
    // If you don't add this the front end will keep waiting for the response as we don't move 
    // forward
    next()

    // Since we come back to the first middleware before sending the response out we put the 
    // calculate function here as next() sends to next middleware or the routes and it returns 
    // back to middleware and excutes from after the run function to send res

    const difference = new Date() - start
    console.log(` The time it took ${difference} mili seconds`)
    
})

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

// Ok here we will set the POST function... that is if the user is posting something.
// either this can be from a from fetch fucntion from the clinet or end can be done using 
// postman.

app.post('/friends', (req,res) => {
    // the value that you are getting in req.body is JSON which we cannot read and understand
    // to understand this code and convert the JSON to JS object we have to make use of middleware 
    // which is called express.json() I have defined it at the start. 
    // Tip: remove the middleware and see you will not be able to read the data.
    // BETTER TO KEEP THIS LINE OF CODE AFTER CHECK AS IT DOES NOT HAVE A CHECK AS 
    // THIS MIGHT CRASH THE SEVER. 
    console.log(req.body.name)

    // Ok now we have to make sure that the value name that is sent is correct and 
    // not some nonsence value.
    const name = req.body.name

    if (name) {

        // adding the new frind to my array (which is my database 😜) if the name is there
        friends.push({
            name: req.body.name,
            id : friends.length
        })
        
        res.status(200).json(friends)

        // This is in place to prevent to res in one file
        return
    }

    // Note we can send the status and the response together like below 
    res.status(400).json("send a proper name")

})

app.listen(3000, () => {
    console.log("server is running at local host 3000")
})