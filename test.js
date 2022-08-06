const http = require("http")
const PORT = 5000

http.createServer((req, res) => {
    res.setHeader('Content-Type', "text/html")
    res.end("<h1>Hello world</h1>")
}).listen(PORT, "127.0.0.1" , () => {
    console.log(`Running on port ${PORT}`)
})

