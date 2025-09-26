export const generateId = (prefix:string) =>{
    return `${prefix}_${Math.random().toString(20).substring(2,9)}`
}