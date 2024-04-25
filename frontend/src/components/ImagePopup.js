function ImagePopup({
  card, 
  onClose
}) {
    return(
      <>
       <section className={`popup popup_image ${card ? 'popup_opened' : ''}`}>
        <div className="popup__container-img">
          <button type="button" className="popup__close-icon" onClick={onClose}>
            <img
              className="popup__close-icon-img popup__close-zoom"
              src="./images/close-icon.png"
              alt="ìcone para fechar o pop-up"
            />
          </button>
          <img className="popup__img-zoom" src={card ? card.link : ''} alt={card ? card.name : ''} />
          <p className="popup__description">{card ? card.name : ''}</p>/
        </div>
       </section>
      </>
    )
}

export default ImagePopup;