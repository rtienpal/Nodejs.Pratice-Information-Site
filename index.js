const fs = require('fs')
const http = require('http')
const path = require ('path')
const port = process.env.PORT || 8000

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : `${req.url}.html`)
    let extname = path.extname(filePath)
    let contentType = 'text.html'
    switch(extname) {
        case '.js':
            contentType = 'text/javascript'
            break
        case '.css':
            contentType = 'text/css'
            break
        case '.json':
            contentType = 'application/json'
            break
        case '.png':
            contentType = 'image/png'
            break
        case '.jpg':
            contentType = 'image/jpg'
            break
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === "ENOENT") {
                fs.readFile(path.join(__dirname, "404.html"), (err, content) => {
                    res.writeHead(200, {"Content-Type" : contentType})
                    res.end(content, 'utf8');
                })
            } else {
                res.writeHead(500)
                res.end(`Server error: ${err.code}`)
        } 

    }
    else {
        res.writeHead(200, {'Content-Type': contentType})
        res.end(content)
    }
}) 
    

    console.log(filePath)
    // console.log(req.url)
    // if (req.url === "/") {
    //     fs.readFile(
    //         path.join(__dirname, "index.html"),
    //         (err, content) => {
    //             if (err) throw err
    //             res.writeHead(200, {'Content-Type': 'text/html'})
    //             res.end(content)
    //         }
    //     )
    // } 
})

server.listen(port, () => {
  console.log(`Server running at port ${port}`)
})