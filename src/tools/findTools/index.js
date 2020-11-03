import * as R from 'ramda'

const editFirstNameInArray = R.curry((firstName, key, array) => R.map(
    R.when(R.propEq('id', key), R.assoc('firstName', firstName)),
    array
))

const editLastNameInArray = R.curry((lastName, key, array) => R.map(
    R.when(R.propEq('id', key), R.assoc('lastName', lastName)),
    array
))


export function findDeletedData(dataList, deletedData){
     return R.reject(R.equals(deletedData), dataList)
}

export function editModeratorsArray(firstName, lastName, key, array){
    const editedArray = editFirstNameInArray(firstName, key, array)
    return editLastNameInArray(lastName, key, editedArray)
}

