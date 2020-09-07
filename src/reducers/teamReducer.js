import produce from 'immer';
import { teamConstants } from '../constants/teamConstants';

export function teams(state = {
  members:[]
}, action) {
  switch (action.type) {
    case teamConstants.ADD:
      return produce(state, draft => {
        draft.members.push(action.member)
      })
    default:
      return state
  }
}