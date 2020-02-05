import axios from 'axios'

const initialState = {
  id: 0,
  dwh_id: 0,
  tagging_status: '',
  description: '',
  venue: {},
  unit_price: 0,
  tags: {},
  merge_possibilities: [],
  error: false,
}

export const state = () => (initialState)

export const mutations = {
  selected (state, data) {
    state.id = data.id
    state.dwh_id = data.dwh_id
    state.description = data.description
    state.venue = data.venue
    state.unit_price = data.unit_price
    state.tags = data.tags
    state.tagging_status = data.tagging_status
    state.merge_possibilities = data.merge_possibilities
  },

  clear (state) {
    state.id = 0
    state.dwh_id = 0
    state.description = ''
    state.venue = {}
    state.unit_price = 0
    state.tags = {}
    state.tagging_status = ''
    state.merge_possibilities = []
  },

  error (state, error) {
    state.error = error
  },

  patch (state, { prop, value }) {
    state.tags[prop] = value
  }
}

export const actions = {
  fetch (context, productId) {
    return axios.get(`https://staging.tagging-portal.tapp.cafe/api/products/${productId}`)
  },

  patch (context, { prop, productId, value}) {
    return axios.patch(`https://staging.tagging-portal.tapp.cafe/api/products/${productId}`, {
      value,
      name: prop,
    })
      .then((response) => {
        return response
      })
      .catch((error) => {
        throw error
      })
  },
}

export const getters = {
  selected: state => {
    return state
  },

  error: state => {
    return state.error
  },
}
