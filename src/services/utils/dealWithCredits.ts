import { ICreditsCrew } from "../../types/models";

export const getDirector = (crew: ICreditsCrew[]) => {
  const director = crew.filter((person) => person.job === "Director");
  if (director.length > 1) {
    let names = '';
    director.forEach((person, index, array) => {
      if (index === array.length - 1) {
        names += person.name;
        return;
      }
      names += person.name + ", ";
    });
    return names;
  }
  return director[0]?.name ? director[0].name : '';
};




// "crew" || "cast"

// {
//     "adult": false,
//     "gender": 1,
//     "id": 1425616,
//     "known_for_department": "Production",
//     "name": "Amy Pascal",
//     "original_name": "Amy Pascal",
//     "popularity": 1.423,
//     "profile_path": "/texxoBV4naFHyuSii6jyxlfuEvK.jpg",
//     "credit_id": "5c2943ac0e0a26541c36f188",
//     "department": "Production",
//     "job": "Producer"
//   },

// {
//     "adult": false,
//     "gender": 1,
//     "id": 1455336,
//     "known_for_department": "Acting",
//     "name": "Issa Rae",
//     "original_name": "Issa Rae",
//     "popularity": 8.914,
//     "profile_path": "/1tX1T5ZNCMh2KYP1jMgfg8P26vm.jpg",
//     "cast_id": 711,
//     "character": "Jessica Drew / Spider-Woman (voice)",
//     "credit_id": "6489a538e375c000c52a3cae",
//     "order": 7
//   },
