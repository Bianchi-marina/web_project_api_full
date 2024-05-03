import React, {createContext, useState} from "react";
const CardContext = createContext([]);
const CardProvider = ({children}) => {
    const [cards, setCard] = useState([]);
    const handleCards = async() => {
        const response = await fetch(`http://localhost:3000/cards`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            "Content-Type": "application/json"
          },
        })
        const handleCards = await response.json();
        setCard(handleCards);
      }
    return (
        <CardContext.Provider value={{cards,setCard,handleCards}}>
            {children}
        </CardContext.Provider>
    )
}
export {
    CardContext,
    CardProvider
};