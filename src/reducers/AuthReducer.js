import * as types from '../actions/types'
import createReducer from '../lib/createReducer'

export const Greeting = createReducer('', {
  [types.WELCOME](state, action) {
    return action.msg
  },
});

export const Anthentication = createReducer('', {
  [types.LOGIN_USER_SUCCESS](state, action){
    return 'SUCCESS!' + JSON.stringify(action.data)
  },
  [types.SIGNUP_USER_SUCCESS](state, action){
    return 'FAILED!'
  }
})

export const isLoading = createReducer(false, {
  [types.ISLOADING](state, action){
    return action.data
  }
})

export const Email = createReducer('', {
  [types.SHOW_VAILD_EMAIL](state, action){
    return action.data
  }
})

export const Password = createReducer('', {
  [types.SHOW_VAILD_PASSWORD](state, action){
    return action.data
  }
})


export const UID = createReducer('', {
  [types.USER_INFO](state, action){
    return action.data.UserID
  }
})

export const MULTIPLIER = createReducer(0, {
  [types.USER_INFO](state, action){
    return action.data.Multipliers
  },
  [types.USER_MULTIPLIER](state, action){
    return action.data
  }
})

export const VOTEUP = createReducer(0, {
  [types.USER_INFO](state, action){
    return action.data.VoteUp
  }
})

export const VOTEDOWN = createReducer(0, {
  [types.USER_INFO](state, action){
    return action.data.VoteDown
  }
})

export const PLUS = createReducer(0, {
  [types.USER_INFO](state, action){
    return action.data.Plus
  }
})

export const MINUS = createReducer(0, {
  [types.USER_INFO](state, action){
    return action.data.Minus
  }
})

export const joinWith = createReducer('', {
  [types.JOIN_WITH](state, action){
    return action.data
  }
})


