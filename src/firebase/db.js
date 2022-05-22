//this is going to store Firebase realtime database API code
import { db } from "./firebase";
import { ref,update} from "firebase/database";

//##########3 user API

//create an user and store it at users/id path (it's an asynchronous func)
export const doCreateUser = (id, username, email) =>
  update(ref(db, `users/${id}`), { username, email });

export const doupdate = (
  id,
  lev,
  coins,
  won,
  lost
) =>{
  update(ref(db, `users/${id}/${lev}`), {won,lost})
  update(ref(db, `users/${id}/`), {coins})
}