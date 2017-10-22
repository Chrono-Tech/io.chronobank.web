import axios from 'axios'

export const BACKEND = axios.create({
  baseURL: 'http://backend.chronobank.tp.ntr1x.com/api/v1',
  timeout: 6000
})
