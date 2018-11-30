import AuthManager from './AuthManager'
import axios from 'axios'
import url from 'url'

class ApiManager {
  static urlObj = {
    protocol: 'http',
    hostname: 'api.sportsfun.shr.ovh',
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
            pathname: '/api/user/q/' + username,
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

  static editUser(infos) {
    console.log(infos)
    return axios
      .put(
        url.format({
          ...ApiManager.urlObj,
          ...{
            pathname: `/api/user`,
          },
        }),
        {
          firstName: infos[0],
          lastName: infos[1],
          email: infos[2],
          password: infos[3],
          bio: infos[4],
          goal: infos[5],
          profilePic: infos[6]
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

  static getUserById(userId) {
    return axios.get(
      url.format({
        ...ApiManager.urlObj,
        ...{
          pathname: `/api/user/${userId}`,
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

  static getPost(postId) {
    return axios
      .get(
        url.format({
          ...ApiManager.urlObj,
          ...{
            pathname: `/api/post/${postId}`,
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
    console.log(error)
    if (error.response && error.response.data && error.response.data.message) {
      throw error.response.data.message
    } else {
      throw ApiManager.unknownErrorMessage
    }
  }

  static getComments(postId) {
    return axios
      .get(
        url.format({
          ...ApiManager.urlObj,
          ...{
            pathname: `/api/post/comments/${postId}`,
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
            pathname: `/api/post/like/${postId}`,
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

  static followUser(userId) {
    return axios
      .put(
        url.format({
          ...ApiManager.urlObj,
          ...{
            pathname: `/api/user/link/${userId}`,
          },
        }),
        {
          id: userId,
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

  static post(content, parent) {
    return axios
      .post(
        url.format({
          ...ApiManager.urlObj,
          ...{
            pathname: '/api/post/',
          },
        }),
        {
          content: content,
          parent: parent,
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

  static getFriends() {
    return axios
      .get(
        url.format({
          ...ApiManager.urlObj,
          ...{
            pathname: `/api/user`,
          },
        }),
        {
          headers: {
            token: AuthManager.getToken(),
          },
        },
      )
      .then(response => response.data.data.links)
      .catch(ApiManager.errorHandler)
  }

  // My Request

  static getInfoUser() {
    return axios
      .get(
        url.format({
          ...ApiManager.urlObj,
          ...{
            pathname: `/api/user`,
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

  static getUsersByPattern(pattern) {
    return axios
      .get(
        url.format({
          ...ApiManager.urlObj,
          ...{
            pathname: `/api/user/p/` + pattern,
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

  // Training Route

  static getTrainingList() {
    return axios
      .get(
        url.format({
          ...ApiManager.urlObj,
          ...{
            pathname: `/api/training`,
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

  static getTrainingById(idTraining) {
    return axios
      .get(
        url.format({
          ...ApiManager.urlObj,
          ...{
            pathname: `/api/training/` + idTraining,
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

  static getTrainingsByUser(idUser) {
    return axios
      .get(
        url.format({
          ...ApiManager.urlObj,
          ...{
            pathname: `/api/user/t/` + idUser,
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

  static editTraining(idTraining, training) {
    if (training.description === '')
      training.description = " "
    return axios
      .put(
        url.format({
          ...ApiManager.urlObj,
          ...{
            pathname: `/api/training/` + idTraining,
          },
        }),
        {
          description: training.description,
          sequences: training.sequences
        },
        {
          headers: {
            token: AuthManager.getToken(),
          },
        },
      )
      .then(response => response)
      .catch(ApiManager.errorHandler)
  }

  static filterTrainings(pattern) {
    return this.getTrainingList()
      .then((trainings) => {
        if (pattern === '') {
          return (trainings)
        } else {
          let result =
            trainings.filter(function (training) {
              return (training.name.toLowerCase().indexOf(pattern.toLowerCase()) !== -1);
            });
          return (result)
        }
      })
  }

  static addTrainingToUser(idTraining, username) {
    console.log(idTraining, username)
    return axios
      .put(
        url.format({
          ...ApiManager.urlObj,
          ...{
            pathname: `/api/user/training`,
          },
        }),
        {
          username: username,
          id: idTraining
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

  static deleteTraining(idTraining, username) {
    return axios
      .post(
        url.format({
          ...ApiManager.urlObj,
          ...{
            pathname: `/api/user/training`,
          },
        }),
        {
          id: idTraining,
          username: username
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

  static getUrl() {
    return url.format(ApiManager.urlObj)
  }

  static getUserByUsername(username) {
    return axios
      .get(
        url.format({
          ...ApiManager.urlObj,
          ...{
            pathname: `/api/user/q/` + username,
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
}

export default ApiManager
