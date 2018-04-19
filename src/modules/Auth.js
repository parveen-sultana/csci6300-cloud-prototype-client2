class Auth {

  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  static authenticateUser(token) {
    localStorage.setItem('token', token);
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    if (localStorage.getItem('token') !== null){
      return true;
     }
     return false;
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  static deauthenticateUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */

  static getToken() {
    return localStorage.getItem('token');
  }

  static setName(name){
    localStorage.setItem('name', name);
  }

  static getName(){
    return localStorage.getItem('name');
  }

  static setEmail(email){
    localStorage.setItem('email', email);
  }

  static getEmail(){
    return localStorage.getItem('email');
  }

}

export default Auth;
