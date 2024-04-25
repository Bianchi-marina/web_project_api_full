import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  
  useEffect(() => {
    if (!isOpen) {
      setName("");
      setLink("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlaceSubmit({
      name,
      link,
    });
    setName("");
    setLink("");
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      title="Novo Local"
      name="popup-add"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <label>
          <input
            id="title-input"
            placeholder="Título"
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            className="popup__form-input popup__form-input_title"
            name="name"
            minLength={2}
            maxLength={30}
            required=""
          />
          <span className="title-input-error" />
        </label>
        <label>
          <input
            id="url-input"
            value={link}
            onChange={(event) => {
              setLink(event.target.value);
            }}
            placeholder="Link da Imagem"
            type="url"
            className="popup__form-input popup__form-input_link"
            name="image"
          />
          <span className="url-input-error" />
        </label>
      </>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
