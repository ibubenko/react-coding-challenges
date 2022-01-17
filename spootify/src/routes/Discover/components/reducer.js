const initialState = { list: [] }

function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return { list: [...state.list, action.payload] }
    case 'remove':
      return { list: state.list.filter((i) => i !== action.payload) }
    default:
      throw new Error()
  }
}

export { reducer, initialState }
