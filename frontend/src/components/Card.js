import {  useContext, useEffect, useState } from "react";
import { CardContext } from "../contexts/getCard";


function Card({ cardData, onCardClick }) {
  const { link, name, owner, likes } = cardData;
  const [user, setUser] = useState([]);
  const [isOwn, setIsOwn] = useState(false); 
  const [isLiked, setIsLiked] = useState(false);
  const {cards,setCard,handleCards} = useContext(CardContext);


  const cardDeleteButtonClassName = `elements__trash ${
    !isOwn ? "" : "elements__trash_hidden"
  }`;

  const handleLike = async(id) => {
    const response = await fetch(`http://localhost:3000/cards/${id}/likes`,{
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json"
      },
    })
    const handleLike = await response.json();
    handleCards();
    return handleLike;
  }
  const handleDelete = async(id) => {
    const response = await fetch(`http://localhost:3000/cards/${id}`,{
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json"
      },
    })
    const handleDelete = await response.json();
    handleCards();
    return handleDelete;
  }

  const getUserInfo = async() => {
    const response = await fetch('http://localhost:3000/users/me', {
      headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      "Content-Type": "application/json"
    },
  })
  const userInfo = await response.json();
  setUser([userInfo]);
  setIsOwn(userInfo._id === owner);
  setIsLiked(likes.some((like) => like === userInfo._id));
  }
  useEffect(()=> {
    getUserInfo();
  },[cardData]);


  return (
    <>
    {
      user.length>0?(
        <li className="elements__li">
        <button
          type="button"
          className={cardDeleteButtonClassName}
          onClick={() => handleDelete(cardData._id)}
        >
          <img
            className="elements__button-trash"
            src="./images/trash.png"
            alt="ícone de lixeira"
          />
        </button>
        <img
          className="elements__card-img"
          src={link}
          alt={name}
          onClick={() => {
            onCardClick(cardData);
          }}
        />
        <div className="elements__card-text">
          <p className="elements__card-name">{name}</p>
          <div className="elements__like">
         {
          isLiked?(
            <button
            onClick={() => handleLike(cardData._id)}
            type="button"
            name="like"
            id="likeButton"
            className="elements__button-like_click"
          ></button>
          ):(
          <button
            onClick={() => handleLike(cardData._id)}
            type="button"
            name="like"
            id="likeButton"
            className="elements__button-like"
          ></button>
        )
         }
            <span className="elements__like-count">{likes.length}</span>
          </div>
        </div>
      </li>
      ): <h1>Loading...</h1>
    }
    </>
  );
}

export default Card;
