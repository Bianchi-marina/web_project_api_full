import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ cardData, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const { link, name, owner, likes } = cardData;

  const isOwn = owner._id === currentUser._id;


  const cardDeleteButtonClassName = `elements__trash ${
    !isOwn ? "" : "elements__trash_hidden"
  }`;

  const isLiked = likes.some((like) => like._id === currentUser._id);

  const cardLikeButtonClassName = `elements__button-like ${
    isLiked ? "elements__button-like_click" : ""
  }`;

  return (
    <>
      <li className="elements__li">
        <button
          type="button"
          className={cardDeleteButtonClassName}
          onClick={() => onCardDelete(cardData)}
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
            <button
              type="button"
              name="like"
              id="likeButton"
              className={cardLikeButtonClassName}
              onClick={() => onCardLike(cardData)}
            ></button>
            <span className="elements__like-count">{likes.length}</span>
          </div>
        </div>
      </li>
    </>
  );
}

export default Card;
