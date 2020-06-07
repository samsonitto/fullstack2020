const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      return Object.assign({}, state, {
        good: initialState.good += 1
      })
    case 'OK':
      return Object.assign({}, state, {
        ok: initialState.ok += 1
      })
    case 'BAD':
      return Object.assign({}, state, {
        bad: initialState.bad += 1
      })
    case 'ZERO':
      return { good: 0, ok: 0, bad: 0 }
    default: return state
  }
  
}

export default counterReducer