import axios from 'axios'
import qs from 'qs'

class API {
  constructor(config) {
    this.config = config
  }

  async getToken() {
    if (this.token) return this.token
    console.log('request: ', this.config.authUrl)
    const response = await axios.request({
      method: 'post',
      baseURL: this.config.authUrl,
      auth: {
        username: this.config.clientId,
        password: this.config.clientSecret,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        grant_type: 'client_credentials',
        scope: 'user-read-private user-read-playback-state user-top-read',
      }),
    })
    return (this.token = response.data.access_token)
  }

  async request(config) {
    const response = await axios.request({
      ...config,
      baseURL: this.config.baseUrl,
      headers: {
        Authorization: 'Bearer ' + (await this.getToken()),
      },
    })
    return response.data
  }

  get(url, config) {
    return this.request({ method: 'get', url, ...config })
  }
}

export default API
