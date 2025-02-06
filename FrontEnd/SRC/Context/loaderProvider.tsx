import { ReactNode, useState } from "react"
import { LoaderContext } from "./loaderContext"
import Loader from "../Components/Reusable/Loader/Loader"

const LoaderProvider = ({ children } : React.PropsWithChildren) => {
    const [loader, setLoader] = useState(false)
    const toggleLoader = () => {
        setLoader((curr) => {
            return !curr 
        })
    }
 
    return (
        <LoaderContext.Provider value={{ loader, toggleLoader }}>
            {children}
            <Loader />
        </LoaderContext.Provider>
    )
}

export default LoaderProvider