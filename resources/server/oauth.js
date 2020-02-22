const passport = require('passport')
const LichessStrategy = require('passport-lichess').Strategy

function initOauth(app, firestore){
    app.use(require('cookie-parser')())
    app.use(require('body-parser').urlencoded({ extended: true }))
    const session = require('express-session')
    const FirestoreStore = require( 'firestore-store' )(session)
    app.use(session({
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 1 * 366 * 31 * 24 * 60 * 60
        },
        store: firestore ? new FirestoreStore({
            database: firestore
        }) : undefined
    }))
    app.use(passport.initialize())
    app.use(passport.session())
}

passport.serializeUser(function(user, cb) {
    cb(null, user)
})
  
passport.deserializeUser(function(obj, cb) {
    cb(null, obj)
})

function getHostProtAndUrl(props){
    let host = process.env.SITE_HOST || props.SITE_HOST || "localhost:3000"
    let prot = host.match(/^localhost:/) ? "http://" : "https://"
    let url = prot + host + props.authURL
    return [host, prot, url]
}

function addLichessStrategy(app, props){
    let [host, prot, url] = getHostProtAndUrl(props)
    passport.use(props.tag, new LichessStrategy({
        clientID: props.clientID,
        clientSecret: props.clientSecret,
        callbackURL: url + "/callback"
        },
        function(accessToken, refreshToken, profile, cb) {
            console.log(`id : ${profile.id}\naccessToken : ${accessToken}\nrefreshToken : ${refreshToken}`)
            profile.accessToken = accessToken
            return cb(null, profile)
        }
    ))

    app.get(props.authURL,
        passport.authenticate('lichess'))

    app.get(props.authURL + "/callback", 
        passport.authenticate(props.tag, { failureRedirect: prot + host + props.failureRedirect }),
            function(_, res) {
                res.redirect(prot + host + props.okRedirect)
            }
    )
}

module.exports = {
    initOauth: initOauth,
    addLichessStrategy: addLichessStrategy
}
