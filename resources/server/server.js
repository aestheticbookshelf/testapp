const express = require('express')
const path = require('path')

const app = express()

const PORT = process.env.PORT || 3000

const __rootdirname = path.join(__dirname, '../..')

app.use(express.static(__rootdirname))

app.get('/', (req, res) => res.send(`
<!DOCTYPE html>
<html lang="en">

    <head>

        <meta charset="utf-8">
        <title>Minimal App</title>    

        <link rel="icon" href="/resources/client/favicon.ico" />

        <link href="/resources/client/css/smartdom/style.css" rel="stylesheet" />
        
    </head>

    <body>    

        <div id="root"></div>

        <script src='dist/js/bundle.js'></script>

    </body>

</html>
`))

app.listen(PORT, () => console.log(`minapp server serving from < ${__rootdirname} > listening on port < ${PORT} > !`))

