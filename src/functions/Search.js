export const contains = ({tipo, name}, query) => {
    if(tipo.includes(query)) {
        return true
    }

    return false
}