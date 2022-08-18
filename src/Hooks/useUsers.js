import { useDispatch, useSelector } from "react-redux";
import { addUser, selectUser } from '../Store/users';

export default function useUsers() {
  let userList = useSelector(state => state.users.list);
  let dispatch = useDispatch();

  let addToUserList = (user) => {
    dispatch(addUser(user));
  }

  let selectOneUser = (user) => {
    dispatch(selectUser(user));
  }

  return {
    userList,
    addToUserList,
    selectOneUser
  }
}