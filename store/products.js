import axios from 'axios'

const initialState = {
  count: null,
  page: null,
  results: [],
  size: null,
  loading: false,
  search: '',
  sort: '',
  order: '',
  page: 1,
  limit: 20,
  error: false,
  totalPages: 0,
}

export const state = () => (initialState)

export const mutations = {
  update (state, data) {
    state.results = data.results
    state.count = data.count
    state.size = data.size
    state.page = data.page
    state.totalPages = Math.ceil(data.count / state.limit)
  },

  reset (state) {
    state.results = []
    state.count = null
    state.size = null
    state.page = null
  },

  search (state, value) {
    state.search = value
  },

  loading (state, loading) {
    state.loading = loading
  },

  limit (state, limit) {
    state.limit = limit
  },

  page (state, page) {
    state.page = page
  },

  error (state, error) {
    state.error = error
  },

  sort (state, sort) {
    state.sort = sort
  },

  order (state, order) {
    state.order = order
  },
}

export const actions = {
  fetch (context, id) {
    const outletId = id ? id : context.rootState.outlets.selected.id

    let url = `https://staging.tagging-portal.tapp.cafe/api/products?venue_id=${outletId}`

    if(context.state.sort.length) {
      url = url + `&sort=${context.state.sort}&order=${context.state.order}`
    }

    if(context.rootState.filter.queryString.length) {
      url = url + context.rootState.filter.queryString
    }

    if(context.state.search.length) {
      url = url + `&brand=${context.state.search}`
    }

    url = url + `&limit=${context.state.limit}&offset=${context.state.page}`

    return axios.get(url)
  },
}

export const getters = {
  results: state => {
    return state.results
  },

  error: state => {
    return state.error
  },

  search: state => {
    return state.search
  },

  loading: state => {
    return state.loading
  },

  limit: state => {
    return state.limit
  },

  page: state => {
    return state.page
  },

  totalPages: state => {
    return state.totalPages
  },

  count: state => {
    return state.count
  },

  sort: state => {
    return state.sort
  },

  order: state => {
    return state.order
  },
}
