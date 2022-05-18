const uploadRoute = require('../modules/upload/upload.router')

function route(app){
    app.use('/upload', uploadRoute)
    
}

module.exports = route