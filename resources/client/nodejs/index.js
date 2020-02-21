const { div } = require('@aestheticbookshelf/smartdom')

let app = div()
    .w(200).h(200).pad(20).bc("#0f0")
    .html("Minimal App")

document.querySelector("#root").appendChild(app.e)
