import { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";
import { CardProvider } from "../contexts/getCard.js";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [selectedCard, setselectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({ name: "", about: "" });
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") ? true : false
  );
  const [userEmail, setUserEmail] = useState(
    localStorage.getItem("userEmail") || ""
  );

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then(() => {
          setLoggedIn(true);
          setUserEmail(localStorage.getItem("userEmail"));
        })
        .catch((error) => {
          console.error("Erro ao verificar token:", error);
          setLoggedIn(false);
        });
      api
        .getUserInfo()
        .then(setCurrentUser)
        .catch((error) => console.log(error));

      api
        .getInitialCards()
        .then((data) => setCards(data))
        .catch((error) => {
          console.error("Erro ao buscar dados dos cartões:", error);
        });
    } else {
      setLoggedIn(false);
    }
  }, []);

  const handleLogin = (email) => {
    setLoggedIn(true);
    setUserEmail(email);
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userEmail", email);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserEmail("");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userEmail");
  };

  const handleUpdateUser = (userData) => {
    api
      .editProfile(userData)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((error) => console.log(error));
  };

  const handleUpdateAvatar = (userData) => {
    api
      .editAvatar(userData)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((error) => console.log(error));
  };

  const handleCreateNewCard = (newCardData) => {
    api
      .createNewCard(newCardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.log(error));
  };

  const closeAllPopups = () => {
    setAddPlacePopupOpen(false);
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setselectedCard(null);
  };

  return (
    <BrowserRouter>
      <section className="page">
        <CardProvider>
          <CurrentUserContext.Provider value={currentUser}>
            <Header
              loggedIn={loggedIn}
              userEmail={userEmail}
              handleLogout={handleLogout}
            />
            <Switch>
              <Route path="/signup">
                <Register />
              </Route>
              <Route path="/signin">
                <Login handleLogin={handleLogin} />
              </Route>
              <ProtectedRoute
                path="/"
                loggedIn={loggedIn}
                component={() => (
                  <Main
                    cards={cards}
                    onEditAvatarClick={() => setEditAvatarPopupOpen(true)}
                    onEditProfileClick={() => setEditProfilePopupOpen(true)}
                    onAddPlaceClick={() => setAddPlacePopupOpen(true)}
                    onCardClick={(card) => setselectedCard(card)}
                  />
                )}
              ></ProtectedRoute>
            </Switch>
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlaceSubmit={handleCreateNewCard}
            />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            <Footer />
          </CurrentUserContext.Provider>
        </CardProvider>
      </section>
    </BrowserRouter>
  );
}

export default App;
