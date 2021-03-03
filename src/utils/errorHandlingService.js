import { v4 } from 'uuid'

// create a class ValidationError extend Error
class ValidationError extends Error {
    constructor(message) {
        super(message)

        this.name = "Validation Error"
        this.message = message
    }
}

// agar log exception dihandle use uuid
const logException = (err) => {
    const uuid = v4()
    let errorId = uuid
    console.error(errorId, err)
    return errorId
}

// function ApiResponse
function ApiResponse(res, vcode = 200, vdata = [], vmeta = {}) {
    res.status(vcode).json({
        success: true,
        meta: vmeta,
        data: vdata
    })
}

function ApiError(vcode, vmessage, vdetails = '') {
    this.name = 'ApiError'
    this.code = vcode
    this.message = vmessage
    this.details = vdetails !== '' ? vdetails : vmessage
}

export {
    ValidationError,
    logException,
    ApiResponse,
    ApiError,
}