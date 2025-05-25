import error from "./error.constructor.js"

const comparateChanges = (changes,actualData) => {
    let oldData = {}
    let changeKeys = Object.keys(changes)
    for(var i = 0; i<changeKeys.length; i++){
        const key = changeKeys[i]
        if(changes[key] == actualData[key]){
            delete changes[key]
        }else{
            oldData[key]=actualData[key]
        }
    }
    
    changeKeys = Object.keys(changes)

    if(changeKeys.length == 0) throw error("No se detectaron parámetros para actuallizar")

    return {realChanges:changes,oldData}

}

export default comparateChanges