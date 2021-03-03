import { logException } from '../utils/errorHandlingService'

const errorHandler = (err, req, res, next) => {
    if (err.name === 'ApiError') {
        const errorId = logException(err.details)
        res.status(err.code).send({
            id: errorId,
            success: false,
            message: err.message,
            detail: typeof err.details === 'object' ? err.details : err.details.toString().split('\n')[0]
        }).end()
    } else { next(err) }
}

const errorValidator = (err, req, res, next) => {
    const status = err.errorStatus || 500
    const message = err.message
    const data = err.data
    res.status(status).json({ message: message, data: data })
}

export {
    errorHandler, errorValidator
}