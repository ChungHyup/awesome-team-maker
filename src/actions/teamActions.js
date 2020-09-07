
import { teamConstants } from '../constants/teamConstants';
export const teamActions = {
  add
}

function add(group, member) {
  return dispatch => {
    dispatch(addMember(group, member));
  }
  function addMember(group, member) { return { type: teamConstants.ADD, group, member } }
}