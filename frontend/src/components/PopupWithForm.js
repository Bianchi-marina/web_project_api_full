function PopupWithForm ({
    title,
    name,
    children,
    isOpen,
    onClose,
    onSubmit
}){
    return(
      <>
        <section className={`popup ${name} ${isOpen ? "popup_opened" : ""}`}>
          <div className="popup__container" id="cards-form">
            <button type="button" className="popup__close-icon" onClick={onClose}>
              <img
                className="popup__close-icon-img popup__close"
                src="./images/close-icon.png"
                alt="ìcone para fechar o pop-up"
              />
            </button>
            <form className="popup__form popup__form_add" noValidate="" onSubmit={onSubmit}>
              <fieldset className="popup__set">
                <h2 className="popup__title">{title}</h2>
                {children}
                <button type="submit" className="popup__button-submit">
                  Criar
                </button>
              </fieldset>
            </form>
          </div>
        </section>
      </>
    )
}

export default PopupWithForm;