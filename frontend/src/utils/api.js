class Api {
    constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
      })
      .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Error: ${res.status}`);
      });
    }
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers,
      })
      .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Error: ${res.status}`);
      });
    }
    editProfile(userData) {
      return fetch(`${this._baseUrl}/users/me`, {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify(
           userData
          ),
      })
      .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Error: ${res.status}`);
      });
    }
    createNewCard({ name, link}) {
      return fetch(`${this._baseUrl}/cards`, {
          method: "POST",
          headers: this._headers,
          body: JSON.stringify({
            name: name,
            link: link,
          })
      })
      .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Error: ${res.status}`);
      });
    }
    deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Error: ${res.status}`);
      });
    }
    
    addLikes(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: this._headers,
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Error: ${res.status}`);
      });
    }
  
    removeLikes(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Error: ${res.status}`);
      });
    }
  
    editAvatar({ avatar }) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({ avatar: avatar }),
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Error: ${res.status}`);
      });
    }

    changeLikeCardStatus (cardId, isLiked) {
      if(!isLiked) {
        return this.addLikes(cardId)
      }
      return this.removeLikes(cardId);
    }
}

const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/web_ptbr_08",
    headers: {
      authorization: "55ee091e-fdde-4068-8e71-e71a57ad15b5",
      "Content-Type": "application/json"
    }
});
export default api; 