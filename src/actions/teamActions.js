
import { teamConstants } from '../constants/teamConstants';
export const teamActions = {
  add
}

function add(member) {
  return dispatch => {
    dispatch(addMember(member));
  }
  function addMember(member) { return { type: teamConstants.ADD, member } }
}