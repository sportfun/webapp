import ApiManager from './ApiManager'
import StorageManager from './StorageManager'

class AuthManager {
  static tokenKey = 'token'
  static ranks = ['user', 'coach', 'authenticated', 'any', 'anonymous']

  static authenticate(username, password, stayLoggedIn) {
    return ApiManager.login(username, password, stayLoggedIn).then(token => {
      StorageManager.setItem(AuthManager.tokenKey, token, stayLoggedIn)
    })
  }

  static isAuthenticated() {
    return !!StorageManager.getItem(AuthManager.tokenKey)
  }

  static logout() {
    StorageManager.removeItem(AuthManager.tokenKey)
  }

  static isAuthorized(requiredRank, userRank = AuthManager.getRank()) {
    if (
      requiredRank === 'any' ||
      userRank === requiredRank ||
      (requiredRank === 'authenticated' && userRank !== 'anonymous')
    ) {
      return true
    }
    if (requiredRank === 'anonymous' && userRank !== 'anonymous') {
      return false
    }
    return false
  }

  static isCoach() {
    return ApiManager.getInfoUser()
      .then((user) => {
        return user.roles[0] === 'coach' ? true : false
      })
  }

  static getRank() {
    // TODO Récupérer le rang de l'utilisateur
    return AuthManager.isAuthenticated() ? 'coach' : 'anonymous'
  }

  static getToken() {
    const token = StorageManager.getItem(AuthManager.tokenKey)
    if (!token) {
      AuthManager.logout()
    }
    return token
  }
}

export default AuthManager
