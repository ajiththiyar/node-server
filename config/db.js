const mongoose = require('mongoose')

const connectDB = () => {
    const conn = mongoose.connect(process.env.MONGO_URI, {
        useCreateIndex:true,
        useFindAndModify:false,
        useNewUrlParser:true
    }).then(
        conn => console.log(`MongoDB Connected: ${conn.connection.host}`)
    ).catch(
        (err) => {
            console.error(err)
            process.exit(1)
        }
    )
}

module.exports = connectDB