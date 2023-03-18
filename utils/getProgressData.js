import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export const getProgressData = async (userId, date) => {
  const daysArray = [
    new Date()
      .toString("en-US", {
        timeZone: "America/New_York",
      })
      .slice(0, 15),
  ];

  // add the last 7 days to the daysArray
  for (let i = 0; i < 6; i++) {
    const newDate = date.setDate(date.getDate() - 1);
    const newDateFormatted = new Date(newDate);
    daysArray.push(
      newDateFormatted
        .toString("en-US", {
          timeZone: "America/New_York",
        })
        .slice(0, 15)
    );
  }

  // reverse the array so that it is in correct order
  daysArray.reverse();

  // Loop through the last 7 days and get the total amount data
  const progressArray = [];

  for (const day of daysArray) {
    const data = await getDoc(doc(db, "users", userId, "dates", day));
    // loop through all the drinks for each of the 7 days and add the total amount to the array
    let totalAmount = 0;
    for (const drink of data.data().drinks) {
      totalAmount += drink.value;
    }
    progressArray.push({ value: totalAmount });
  }

  // find the highest drink amount out of the last 7 days, this is needed for the chart
  let highestValue = 0;
  let totalAmount = 0;

  for (const amount of progressArray) {
    totalAmount += amount.value;
    if (amount.value > highestValue) {
      highestValue = amount.value;
    }
  }

  // calculate the average drink amount for the last 7 days
  const averageValue = totalAmount / 7;

  return { daysArray, progressArray, highestValue, averageValue };
};
