const missingParameters = (obj, mandatory) => {
    
    let objKeys = Object.entries(obj).map((key) => key[0])
    let missingParameters = mandatory.filter((key) => !objKeys.includes(key))

    return missingParameters

};

export default missingParameters