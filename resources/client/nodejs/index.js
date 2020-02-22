const { div, Button } = require('@aestheticbookshelf/smartdom')

const USER = PROPS.USER || {}

let app = div().a(
    Button("Login with lichess", () => document.location.href = "/auth/lichess"),
    Button("Login with lichess-bot", () => document.location.href = "/auth/lichess/bot"),
    div().html(`user id: ${USER.id}`)
)    

document.querySelector("#root").appendChild(app.e)
