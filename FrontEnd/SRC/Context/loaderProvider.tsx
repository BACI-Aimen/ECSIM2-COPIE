import { ReactNode, useState } from "react"
import { LoaderContext } from "./loaderContext"

const LoaderProvider = ({ children } : React.PropsWithChildren) => {
    const [loader, setLoader] = useState(false)
    const toggleLoader = () => {
        setLoader(!loader)
    }
 
    return (
        <LoaderContext.Provider value={{ loader, toggleLoader }}>
            {children}
        </LoaderContext.Provider>
    )
}

export default LoaderProvider