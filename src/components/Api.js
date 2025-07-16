class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // Método privado para hacer solicitudes HTTP
  _request(endpoint, options = {}) {
    const url = `${this._baseUrl}${endpoint}`;
    const config = {
      headers: this._headers,
      ...options
    };

    return fetch(url, config)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`Error en la respuesta del servidor: ${res.status}`);
      });
  }

  // Obtener información del usuario
  getUserInfo() {
    return this._request('/users/me');
  }

  // Actualizar información del perfil
  updateUserInfo(userData) {
    return this._request('/users/me', {
      method: 'PATCH',
      body: JSON.stringify(userData)
    });
  }

  // Actualizar avatar del usuario
  updateUserAvatar(avatarUrl) {
    return this._request('/users/me/avatar', {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: avatarUrl
      })
    });
  }

  // Obtener todas las tarjetas
  getInitialCards() {
    return this._request('/cards/');
  }

  // Crear una nueva tarjeta
  createCard(cardData) {
    return this._request('/cards', {
      method: 'POST',
      body: JSON.stringify(cardData)
    });
  }

  // Eliminar una tarjeta
  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: 'DELETE'
    });
  }

  // Dar like a una tarjeta
  likeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'PUT'
    });
  }

  // Quitar like de una tarjeta
  unlikeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'DELETE'
    });
  }
}

export { Api }; 