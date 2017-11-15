import axios from 'axios'

export const BACKEND = axios.create({
  baseURL: process.env.API_ENDPOINT,
  timeout: 6000
})
