import config from '../config'
import API from './api'

const api = new API(config.api)

export { api }
