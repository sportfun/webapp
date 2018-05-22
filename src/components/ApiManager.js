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
      .catch(ApiManager.errorHandler)
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
      .catch(ApiManager.errorHandler)
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
    return promise
      .then(response => response.data.data)
      .catch(ApiManager.errorHandler)
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
      .then(response => response.data.data)
      .catch(ApiManager.errorHandler)
  }

  static getPosts() {
    return axios
      .get(
        url.format({
          ...ApiManager.urlObj,
          ...{
            pathname: '/api/post',
          },
        }),
        {
          headers: {
            token: AuthManager.getToken(),
          },
        },
      )
      .then(response => response.data.data)
      .catch(ApiManager.errorHandler)
  }

  static errorHandler(error) {
    console.error(error.response)
    throw typeof error.response.data.message === 'string'
      ? error.response.data.message
      : ApiManager.unknownErrorMessage
  }

  static getComments(postId) {
    return axios
      .get(
        url.format({
          ...ApiManager.urlObj,
          ...{
            pathname: '/api/post/comments/' + postId.toString(),
          },
        }),
        {
          headers: {
            token: AuthManager.getToken(),
          },
        },
      )
      .then(response => response.data.data)
      .catch(ApiManager.errorHandler)
  }

  static likePost(postId) {
    return axios
      .put(
        url.format({
          ...ApiManager.urlObj,
          ...{
            pathname: '/api/post/like/' + postId.toString(),
          },
        }),
        {
          id: postId,
        },
        {
          headers: {
            token: AuthManager.getToken(),
          },
        },
      )
      .then(response => response.data.data)
      .catch(ApiManager.errorHandler)
  }

  static post(content) {
    return axios
      .post(
        url.format({
          ...ApiManager.urlObj,
          ...{
            pathname: '/api/post/',
          },
        }),
        {
          headers: {
            token: AuthManager.getToken(),
          },
          content: content,
        },
      )
      .then(response => response.data.data)
      .catch(ApiManager.errorHandler)
  }
}

export default ApiManager
