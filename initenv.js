const path = require('path')
const cu = require('@aestheticbookshelf/confutils')

cu.setEnvDir(path.join(__dirname, "env"))

cu.writeFileToConfig("common", "default", "SACCKEY", "sacckeyorig.json")

cu.writeMakeEnvScript([["common", "default"]], "makeenv.bat")

//cu.fromChunksToFile("SACCKEY", "sacckey.json")

//cu.writeHerokuConfig("testapp")

/*let fa = cu.FirebaseAdmin({
    envDir: path.join(__dirname, "env"),
    storageBucket: "pgneditor-1ab96.appspot.com",
    databaseURL: "https://pgneditor-1ab96.firebaseio.com/"
})*/

