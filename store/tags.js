import axios from 'axios'

const initialState = {}

export const state = () => (initialState)
export const mutations = {}

export const actions = {
  search (context, options) {
    return axios.get(`https://staging.tagging-portal.tapp.cafe/api/tags/search?tag_level=${options.level}&tag_value=${options.value}`)
  },
}

export const getters = {}
