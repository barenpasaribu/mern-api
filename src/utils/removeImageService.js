import path from 'path'
import fs from 'fs'


export const removeImage = (filePath) => {
    filePath = path.join(__dirname, '../../..', filePath)
    fs.unlink(filePath, err => console.log(err))
}

