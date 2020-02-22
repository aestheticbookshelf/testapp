const { div, Button } = require('@aestheticbookshelf/smartdom')

let app = div().a(
    Button("Login with lichess", () => document.location.href = "/auth/lichess"),
    Button("Login with lichess-bot", () => document.location.href = "/auth/lichess/bot"),
    div().html(`user id: ${PROPS.USER.id}`)
)    

document.querySelector("#root").appendChild(app.e)
