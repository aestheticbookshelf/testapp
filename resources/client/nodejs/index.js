const { div, Button } = require('@aestheticbookshelf/smartdom')
const { LichessBot } = require('@aestheticbookshelf/lichessbot')

const USER = PROPS.USER || {}

let app = div().a(
    Button("Login with lichess", () => document.location.href = "/auth/lichess"),
    Button("Login with lichess-bot", () => document.location.href = "/auth/lichess/bot"),
    div().html(`user id: ${USER.id}`)
)    

if(USER.id){
    let b = LichessBot({
        userId: USER.id,
        token: USER.accessToken,
        stockfishPath: "resources/client/cdn/stockfish.wasm.js",
        acceptVariant: "standard",
        minInitialClock: 15
    })

    console.log(b)

    b.stream()
}

document.querySelector("#root").appendChild(app.e)
