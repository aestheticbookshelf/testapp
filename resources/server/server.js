const express = require('express')
const path = require('path')
const cu = require('@aestheticbookshelf/confutils')

const oauth = require('@aestheticbookshelf/oauth')

const { LichessBot } = require('@aestheticbookshelf/lichessbot')

const app = express()

const PORT = process.env.PORT || 3000

const __rootdirname = path.join(__dirname, '../..')

app.use(express.static(__rootdirname))

const fa = cu.FirebaseAdmin({
    envDir: path.join(__rootdirname, "env"),
    storageBucket: "pgneditor-1ab96.appspot.com",
    databaseURL: "https://pgneditor-1ab96.firebaseio.com/"
})

oauth.initOauth(app, fa.firestore)

oauth.addLichessStrategy(app, {
    tag: "lichess-common",
    clientID: process.env.LICHESS_CLIENT_ID,
    clientSecret: process.env.LICHESS_CLIENT_SECRET,
    authURL: "/auth/lichess",
    failureRedirect: "/?lichesslogin=failed",
    okRedirect: "/?lichesslogin=ok"
})

oauth.addLichessStrategy(app, {
    tag: "lichess-bot",
    clientID: process.env.LICHESS_BOT_CLIENT_ID,
    clientSecret: process.env.LICHESS_BOT_CLIENT_SECRET,
    authURL: "/auth/lichess/bot",
    scope: "challenge:read challenge:write bot:play",
    failureRedirect: "/?lichessbotlogin=failed",
    okRedirect: "/?lichessbotlogin=ok"
})

if(process.env.ALLOW_BOT){
    let b = LichessBot({
        userId: process.env.BOT_ID,
        token: process.env.BOT_TOKEN,
        stockfishPath: path.join(__rootdirname, "resources/server/bin/stockfish"),
        acceptVariant: process.env.BOT_ACCEPT_VARIANT || "standard",
        minInitialClock: 15
    })

    console.log(b)

    b.stream()
}

app.get('/', (req, res) => res.send(`
<!DOCTYPE html>
<html lang="en">

    <head>

        <meta charset="utf-8">
        <title>Minimal App</title>    

        <link rel="icon" href="/resources/client/favicon.ico" />

        <link href="/resources/client/css/smartdom/style.css" rel="stylesheet" />

        <script>
        const PROPS = {
            USER: ${JSON.stringify(req.user, null, 2)}
        }
        </script>
        
    </head>

    <body>    

        <div id="root"></div>

        <script src='dist/js/bundle.js'></script>

    </body>

</html>
`))

app.listen(PORT, () => console.log(`minapp server serving from < ${__rootdirname} > listening on port < ${PORT} > !`))

