import axios from 'axios'

export const state = () => ({
  count: null,
  page: null,
  size: null,
  results: [],
  error: false,
  total_pages: null,
  offset: 1,
  limit: 10,
  search: '',
  selected: {
    name: null,
    id: null
  },
})

export const mutations = {
  update (state, data) {
    state.results = data.results
    state.count = data.count
    state.size = data.size
    state.page = data.page
    state.total_pages = data.total_pages
  },

  search (state, value) {
    state.search = value
  },

  next (state) {
    state.offset = state.offset += 1
  },

  prev (state) {
    state.offset = state.offset -= 1
  },

  error (state, error) {
    state.error = error
  },

  selected (state, outlet) {
    state.selected.name = outlet.name
    state.selected.id = outlet.id
  }
}

export const actions = {
  fetch (context) {

    return axios.get(`https://staging.tagging-portal.tapp.cafe/api/venues?name=${context.state.search}&offset=${context.state.offset}&limit=${context.state.limit}`)
      .then((response) => {
        return response
      })
      .catch((error) => {
        throw error
      })
  },
}

export const getters = {
  results: state => {
    return state.results
  },

  count: state => {
    return state.count
  },

  size: state => {
    return state.size
  },

  page: state => {
    return state.page
  },

  total_pages: state => {
    return state.total_pages
  },

  search: state => {
    return state.search
  },

  offset: state => {
    return state.offset
  },

  error: state => {
    return state.error
  },

  limit: state => {
    return state.limit
  },

  selected: state => {
    return state.selected
  },
}
