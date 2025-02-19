import { ICreditsCrew } from "@/entities/cast/model/types.interface";

export const getDirector = (crew: ICreditsCrew[]) => {
  const director = crew.filter((person) => person.job === "Director");
  if (director.length > 1) {
    let names = "";
    director.forEach((person, index, array) => {
      if (index === array.length - 1) {
        names += person.name;
        return;
      }
      names += person.name + ", ";
    });
    return names;
  }
  return director[0]?.name ? director[0].name : "";
};

export const getRuntime = (time: number) => {
  const hours = Math.floor(time / 60);
  const minutes = time - 60 * hours;

  if (minutes != 0) {
    return `${hours}h ${minutes}min`;
  }
  return `${hours}h`;
};

export const getBudget = (money: number) => {
  const budgetStr = money.toString();
  let formattedBudget = "";
  let counter = 0;

  for (let i = budgetStr.length - 1; i >= 0; i--) {
    if (counter === 3) {
      formattedBudget = "," + formattedBudget;
      counter = 0;
    }
    formattedBudget = budgetStr[i] + formattedBudget;
    counter++;
  }

  return "$" + formattedBudget;
};