import { db } from "../firebase";
import { collection, query, doc, getDoc } from "firebase/firestore";

export const getCupSettings = async (userId) => {
  const data = await getDoc(doc(db, "users", userId));

  return data.data();
};
