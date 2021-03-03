import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import multer from 'multer'
import path from 'path'
import routes from './routes'
import { errorHandler, errorValidator } from './middleware/errorHandler'
import { fileStorage, fileFilter } from './utils/uploadImageService'

const app = express()


// middleware body-parser and parse http request cookies for parsing data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

// midleware multer for upload image
app.use('images', express.static(path.join(__dirname, 'images')))
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'))

// enable cors request
app.use(cors())

// run all routes use app
routes(app)

// handling error
app.use(errorValidator)
app.use(errorHandler)

// database mongoose
mongoose.connect('mongodb+srv://barenpasaribu:MmpdBqlz7zyXZv24@cluster0.zl5w6.mongodb.net/db_blog?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

app.listen(3001, () => console.log('Server App listening on port 3001!'))

export default app