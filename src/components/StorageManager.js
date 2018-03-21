class StorageManager {
  static setItem(key, value, persist = false) {
    if (persist) {
      localStorage.setItem(key, JSON.stringify(value))
    } else {
      sessionStorage.setItem(key, JSON.stringify(value))
    }
  }

  static getItem(key) {
    const item = localStorage.getItem(key) || sessionStorage.getItem(key)
    try {
      return JSON.parse(item)
    } catch (e) {
      StorageManager.removeItem(key)
      return item
    }
  }

  static removeItem(key) {
    localStorage.removeItem(key)
    sessionStorage.removeItem(key)
  }
}

export default StorageManager
