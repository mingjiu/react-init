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
  },
  CLICK_PLUS: state => {
    return {
      ...state,
      clickCount: state.clickCount + 1
    }
  }
}, {
  uiState: {
    isLoading: false
  },
  clickCount: 0
})
export default app