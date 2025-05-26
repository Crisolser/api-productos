const invalidParameters = (obj, validParameters) => {
  
    let invalid = Object.entries(obj)
                        .filter(([key]) => !validParameters.includes(key))
                        .map((key) => key[0])

    return invalid

};

export default invalidParameters