class Api {
    constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          "Content-Type": "application/json"
        },
      })
      .then(res => {
          if (res.ok) {
            return res.json();
          }
          // return Promise.reject(`Error: ${res.status}`);
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
          // return Promise.reject(`Error: ${res.status}`);
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
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            "Content-Type": "application/json"
          },
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
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          "Content-Type": "application/json"
        },
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Error: ${res.status}`);
      });
    }
  
    editAvatar({ avatar }) {
      return fetch(`${this._baseUrl}/users/me`, {
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
}

const api = new Api({
    baseUrl: "http://localhost:3000",
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      "Content-Type": "application/json"
    }
});
export default api; 