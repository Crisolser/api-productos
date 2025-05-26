const error = (message,additionalData) => {
    let newError = new Error(message)
    newError.statusCode = 400
    if(additionalData) newError.additionalData = additionalData
    return newError
}

export default error