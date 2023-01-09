import { db } from "../firebase";
import { collection, query, doc, getDoc } from "firebase/firestore";

export const getDateData = async (userId, today) => {
  const data = await getDoc(doc(db, "users", userId, "dates", today));

  return data.data();
};
