import { db } from "../firebase";
import { collection, query, doc, getDoc } from "firebase/firestore";

export const getSettings = async (userId) => {
  const data = await getDoc(doc(db, "users", userId));

  return data.data();
};
