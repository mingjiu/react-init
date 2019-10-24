import { createAction } from 'redux-actions'

export const setHomeUIState = createAction('HOME_UI_STATE')

const clickPlus = createAction('CLICK_PLUS')

function delay () {
  return new Promise((resolve, reject) => {
    setTimeout(()=> {
      resolve()
    }, 1000)
  })
}

export const clickPlusRightNow = () => async dispatch => {
  dispatch(clickPlus())
}

export const clickPlusAsync = () => async dispatch => {
  dispatch(setHomeUIState(['isLoading', true]))

  await delay().then(() => {
    dispatch(clickPlus())
  })
  
  dispatch(setHomeUIState(['isLoading', false]))
}
