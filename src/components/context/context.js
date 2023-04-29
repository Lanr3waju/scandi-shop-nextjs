import {createContext, useState} from "react"

export const Category_filter = createContext()

function Context({children}) {
    const [ categoryFilter, setCategoryFilter ] = useState('')

    return (
        <Category_filter.Provider value={{categoryFilter, setCategoryFilter}}>
            {children}
        </Category_filter.Provider>
    )
}

export default Context
