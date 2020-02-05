import axios from 'axios'

const initialState = {
  error: false,
  filterParams: {},
  available: [],
  queryString: '',
  filtering: false,
}

export const state = () => (initialState)

export const mutations = {
  update (state, data) {
    state.available = data['available_filters']
  },

  reset (state) {
    state.filterParams = {}
    state.available = []
    state.queryString = ''
    state.filtering = false
  },

  addFilterParam (state, data) {
    const {
      filterTitleMeta,
      metadata,
    } = data

    state.filterParams = {
      ...state.filterParams,
      [filterTitleMeta]: {
        ...state.filterParams[filterTitleMeta],
        [metadata]: metadata,
      },
    }
  },

  removeFilterParam (state, data) {
    const {
      filterTitleMeta,
      metadata,
    } = data

    const filters = { ...state.filterParams }
    delete filters[filterTitleMeta][metadata]

    let propsCount = 0
    for(let key in filters[filterTitleMeta]) {
      propsCount += 1
    }

    if(!propsCount) delete filters[filterTitleMeta]

    state.filterParams = filters
  },

  generateQuery (state) {
    const filters = state.filterParams
    let queryString = '&'

    for(let key in filters) {
      queryString = queryString + key + '='

      let metaCount = 0
      for(let metaKey in filters[key]) {
        queryString = queryString + filters[key][metaKey] + ','
      }

      queryString = queryString.substring(0, queryString.length - 1) + '&'
    }

    queryString = queryString.substring(0, queryString.length - 1)

    state.queryString = queryString
  },

  error (state, error) {
    state.error = error
  },

  filtering (state, filtering) {
    state.filtering = filtering
  }
}
export const actions = {
  fetch (context, id) {
    return axios.get(`https://staging.tagging-portal.tapp.cafe/api/products/filter-metadata?venue_id=${id}`)
  },
}

export const getters = {
  available: state => {
    return state.available
  },

  filterParams: state => {
    let count = 0
    for(let key in state.filterParams) {
      count += 1
    }
    return count
  },

  filtering: state => {
    return state.filtering
  }
}
