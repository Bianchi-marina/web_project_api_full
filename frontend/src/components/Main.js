import { useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({
  cards,
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <section className="profile">
        <div className="profile__view">
          <button
            onClick={onEditAvatarClick}
            type="button"
            className="profile__edit-avatar"
          >
            <img
              className="profile__img"
              src={currentUser.avatar}
              alt="Foto de perfil do usuário"
            />
          </button>
          <div className="profile__description">
            <h2 className="profile__name">{currentUser.name}</h2>
            <h2 className="profile__job">{currentUser.about}</h2>
            <button
              onClick={onEditProfileClick}
              type="button"
              className="profile__edit-button"
            >
              <img
                className="profile__edit-button-img"
                src="./images/edit-button.png"
                alt="Botão de editar o texto do perfil do usuário"
              />
            </button>
          </div>
        </div>
        <button
          onClick={onAddPlaceClick}
          type="button"
          className="profile__add-button"
        >
          <img
            className="profile__add-img"
            src="./images/add-button.png"
            alt="Botão para adicionar conteúdo a página"
          />
        </button>
      </section>
      <section className="elements">
        <ul className="elements__card elements">
          {cards.map((card) => (
            <Card
              cardData={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
        <template id="template-card" />
      </section>
      <section className="popup popup_delete">
        <div className="popup__container popup__container_delete">
          <button type="button" className="popup__close-icon">
            <img
              className="popup__close-icon-img"
              src="./images/close-icon.png"
              alt="ìcone para fechar o pop-up"
            />
          </button>
          <h2 className="popup__title">Tem certeza?</h2>
          <button type="button" className="popup__button-submit">
            Sim
          </button>
        </div>
      </section>
    </>
  );
}

export default Main;
