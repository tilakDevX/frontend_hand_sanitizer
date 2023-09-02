import React,{ createContext, useState } from "react";



const MyContext = createContext();

const MyContextProvider = ({children})=>{

    let [isMenuOpen, setIsMenuOpen] = useState(false);
    let [cartStatus, setcartStatus] = useState("success");


    // const toggleButton = () => {
    //   setIsMenuOpen(!isMenuOpen);
    // };


    const contextValue ={
        isMenuOpen,
        setIsMenuOpen, 
        cartStatus,
        setcartStatus
    }

    return (
        <MyContext.Provider value = {contextValue} >
                {children}
        </MyContext.Provider>
    )

}

export {MyContext,MyContextProvider}