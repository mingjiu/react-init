import { handleActions } from 'redux-actions'

const app = handleActions({
  HOME_UI_STATE: (state, action) => {
    let { uiState } = state
    uiState[action.payload[0]]= action.payload[1]
    return {
      ...state,
      uiState: {
        ...state.uiState
      }
    }
  }
}, {
  uiState: {
    isLoading: true
  }
})
export default app