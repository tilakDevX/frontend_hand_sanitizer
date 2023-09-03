import React,{ createContext, useState } from "react";



const MyContext = createContext();

const MyContextProvider = ({children})=>{

    let [isMenuOpen, setIsMenuOpen] = useState(false);
    


    // const toggleButton = () => {
    //   setIsMenuOpen(!isMenuOpen);
    // };


    const contextValue ={
        isMenuOpen,
        setIsMenuOpen, 
        
    }

    return (
        <MyContext.Provider value = {contextValue} >
                {children}
        </MyContext.Provider>
    )

}

export {MyContext,MyContextProvider}