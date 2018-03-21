import AuthManager from './AuthManager'
import axios from 'axios'
import url from 'url'

class ApiManager {
  static urlObj = {
    protocol: 'http',
    hostname: '149.202.41.22',
    port: 8080,
  }

  static unknownErrorMessage = 'Une erreur est survenue'

  static login(username, password) {
    return axios
      .post(
        url.format({
          ...ApiManager.urlObj,
          ...{
            pathname: '/api/user/login',
          },
        }),
        {
          username,
          password,
        },
      )
      .then(response => response.data.data.token)
      .catch(error => {
        console.error(error.response)
        throw typeof error.response.data.message === 'string'
          ? error.response.data.message
          : ApiManager.unknownErrorMessage
      })
  }

  static register(username, password, email, firstName, lastName, birthDate) {
    return axios
      .post(
        url.format({
          ...ApiManager.urlObj,
          ...{
            pathname: '/api/user',
          },
        }),
        {
          username,
          password,
          email,
          firstName,
          lastName,
          birthDate,
        },
      )
      .catch(error => {
        console.error(error.response)
        throw typeof error.response.data.message === 'string'
          ? error.response.data.message
          : ApiManager.unknownErrorMessage
      })
  }

  static getUser(username) {
    const promise = username
      ? axios.get(
          url.format({
            ...ApiManager.urlObj,
            ...{
              pathname: `'/api/user/q/${username}'`,
            },
          }),
          {
            headers: {
              token: AuthManager.getToken(),
            },
          },
        )
      : axios.get(
          url.format({
            ...ApiManager.urlObj,
            ...{
              pathname: '/api/user',
            },
          }),
          {
            headers: {
              token: AuthManager.getToken(),
            },
          },
        )
    return promise.then(response => response.data.data).catch(error => {
      console.error(error.response)
      throw typeof error.response.data.message === 'string'
        ? error.response.data.message
        : ApiManager.unknownErrorMessage
    })
  }

  static getActivities(username) {
    // TODO Utiliser le username
    return axios
      .get(
        url.format({
          ...ApiManager.urlObj,
          ...{
            pathname: '/api/activity',
          },
        }),
        {
          headers: {
            token: AuthManager.getToken(),
          },
        },
      )
      .then(response => response.data.data.activities)
      .catch(error => {
        console.error(error.response)
        throw typeof error.response.data.message === 'string'
          ? error.response.data.message
          : ApiManager.unknownErrorMessage
      })
  }
}

export default ApiManager
