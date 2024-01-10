export interface IRecievedGenres {
  id: number;
  name: string;
}

export interface ISelectedGenre {
  id: number;
  name: string;
}

export type TGenresFor = "movie" | "tvSeries" | "trending";

export interface IFormData {
  searchInput: string;
}

export interface ISearchWidgetProps {
  onFormSubmit: (formData: IFormData) => void;
}

interface ICollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
  homepage: string;
}
interface IProduction_Company {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}
interface IProduction_Country {
  iso_3166_1: string;
  name: string;
}
interface ISpoken_language {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface IRecievedMovieCard_SingleData {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: ICollection;
  budget: number;
  genres: ISelectedGenre[];
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IProduction_Company[];
  production_countries: IProduction_Country[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: ISpoken_language[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

// {
//   "adult": false,
//   "backdrop_path": "/tfw5LKySp7uEYJ3CUuD4TKx3s8y.jpg",
//   "belongs_to_collection": {
//       "id": 404609,
//       "name": "John Wick Collection",
//       "poster_path": "/xUidyvYFsbbuExifLkslpcd8SMc.jpg",
//       "backdrop_path": "/fSwYa5q2xRkBoOOjueLpkLf3N1m.jpg"
//   },
//   "budget": 90000000,
//   "genres": [
//       {
//           "id": 28,
//           "name": "Action"
//       },
//       {
//           "id": 53,
//           "name": "Thriller"
//       },
//       {
//           "id": 80,
//           "name": "Crime"
//       }
//   ],
//   "homepage": "https://johnwick.movie",
//   "id": 603692,
//   "imdb_id": "tt10366206",
//   "original_language": "en",
//   "original_title": "John Wick: Chapter 4",
//   "overview": "With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.",
//   "popularity": 505.696,
//   "poster_path": "/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
//   "production_companies": [
//       {
//           "id": 3528,
//           "logo_path": "/cCzCClIzIh81Fa79hpW5nXoUsHK.png",
//           "name": "Thunder Road",
//           "origin_country": "US"
//       },
//       {
//           "id": 23008,
//           "logo_path": "/5SarYupipdiejsEqUkwu1SpYfru.png",
//           "name": "87Eleven",
//           "origin_country": "US"
//       },
//       {
//           "id": 491,
//           "logo_path": "/5LvDUt3KmvRnXQ4NrdWJYHeuA8J.png",
//           "name": "Summit Entertainment",
//           "origin_country": "US"
//       },
//       {
//           "id": 264,
//           "logo_path": "/fA90qwUKgPhMONqtwY60GaHRyrW.png",
//           "name": "Studio Babelsberg",
//           "origin_country": "DE"
//       }
//   ],
//   "production_countries": [
//       {
//           "iso_3166_1": "DE",
//           "name": "Germany"
//       },
//       {
//           "iso_3166_1": "US",
//           "name": "United States of America"
//       }
//   ],
//   "release_date": "2023-03-22",
//   "revenue": 426978565,
//   "runtime": 170,
//   "spoken_languages": [
//       {
//           "english_name": "Arabic",
//           "iso_639_1": "ar",
//           "name": "العربية"
//       },
//       {
//           "english_name": "Cantonese",
//           "iso_639_1": "cn",
//           "name": "广州话 / 廣州話"
//       },
//       {
//           "english_name": "English",
//           "iso_639_1": "en",
//           "name": "English"
//       },
//       {
//           "english_name": "French",
//           "iso_639_1": "fr",
//           "name": "Français"
//       },
//       {
//           "english_name": "German",
//           "iso_639_1": "de",
//           "name": "Deutsch"
//       },
//       {
//           "english_name": "Japanese",
//           "iso_639_1": "ja",
//           "name": "日本語"
//       },
//       {
//           "english_name": "Latin",
//           "iso_639_1": "la",
//           "name": "Latin"
//       },
//       {
//           "english_name": "Russian",
//           "iso_639_1": "ru",
//           "name": "Pусский"
//       },
//       {
//           "english_name": "Spanish",
//           "iso_639_1": "es",
//           "name": "Español"
//       }
//   ],
//   "status": "Released",
//   "tagline": "No way back, one way out.",
//   "title": "John Wick: Chapter 4",
//   "video": false,
//   "vote_average": 7.766,
//   "vote_count": 5343
// }

interface ICreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}
interface ILastEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
}
interface INextEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number | null;
  season_number: number;
  show_id: number;
  still_path: string | null;
}
interface INetworks {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

//!
export interface ITvCard_Single {
  adult: boolean;
  backdrop_path: string;
  created_by: ICreatedBy[];
  genres: ISelectedGenre[];
  last_air_date: string;
  episode_run_time: number[];
  first_air_date: string;
  homepage: string;
  in_production: boolean;
  languages: string[];
  id: number;
  last_episode_to_air: ILastEpisodeToAir;
  name: string;
  next_episode_to_air: INextEpisodeToAir;
  networks: INetworks[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IProduction_Company[];
  production_countries: IProduction_Country[];
  seasons: ISeasonData[];
  spoken_languages: ISpoken_language[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

// {
//   "adult": false,
//   "backdrop_path": "/nDOIsgCYZqEMvomSR6t9QUIPZJS.jpg",
//   "created_by": [
//       {
//           "id": 202816,
//           "credit_id": "53513084c3a3681da00012ef",
//           "name": "Noah Hawley",
//           "gender": 2,
//           "profile_path": "/pxVP1lywEBA9y8x5Xe3kM7m4ai3.jpg"
//       }
//   ],
//   "episode_run_time": [],
//   "first_air_date": "2014-04-15",
//   "genres": [
//       {
//           "id": 80,
//           "name": "Crime"
//       },
//       {
//           "id": 18,
//           "name": "Drama"
//       }
//   ],
//   "homepage": "http://www.fxnetworks.com/fargo",
//   "id": 60622,
//   "in_production": true,
//   "languages": [
//       "en"
//   ],
//   "last_air_date": "2024-01-02",
//   "last_episode_to_air": {
//       "id": 4661618,
//       "name": "Blanket",
//       "overview": "Roy's campaign continues, Indira takes a stand and Witt tries to help.",
//       "vote_average": 8.5,
//       "vote_count": 2,
//       "air_date": "2024-01-02",
//       "episode_number": 8,
//       "episode_type": "standard",
//       "production_code": "XFO05008",
//       "runtime": 47,
//       "season_number": 5,
//       "show_id": 60622,
//       "still_path": "/xdcDvCu4fvVyt4qdGBuJKOSjqKb.jpg"
//   },
//   "name": "Fargo",
//   "next_episode_to_air": {
//       "id": 4661619,
//       "name": "The Useless Hand",
//       "overview": "The tide turns.",
//       "vote_average": 0,
//       "vote_count": 0,
//       "air_date": "2024-01-09",
//       "episode_number": 9,
//       "episode_type": "standard",
//       "production_code": "",
//       "runtime": null,
//       "season_number": 5,
//       "show_id": 60622,
//       "still_path": null
//   },
//   "networks": [
//       {
//           "id": 88,
//           "logo_path": "/aexGjtcs42DgRtZh7zOxayiry4J.png",
//           "name": "FX",
//           "origin_country": "US"
//       }
//   ],
//   "number_of_episodes": 51,
//   "number_of_seasons": 5,
//   "origin_country": [
//       "US"
//   ],
//   "original_language": "en",
//   "original_name": "Fargo",
//   "overview": "A close-knit anthology series dealing with stories involving malice, violence and murder based in and around Minnesota.",
//   "popularity": 1795.326,
//   "poster_path": "/6U9CPeD8obHzweikFhiLhpc7YBT.jpg",
//   "production_companies": [
//       {
//           "id": 20814,
//           "logo_path": null,
//           "name": "26 Keys Productions",
//           "origin_country": "US"
//       },
//       {
//           "id": 20815,
//           "logo_path": null,
//           "name": "The Littlefield Company",
//           "origin_country": "US"
//       },
//       {
//           "id": 2092,
//           "logo_path": "/f8s2OKSrnfaCmvCz2LCGxk1WNWO.png",
//           "name": "Mike Zoss Productions",
//           "origin_country": "US"
//       },
//       {
//           "id": 2230,
//           "logo_path": null,
//           "name": "MGM Television",
//           "origin_country": "US"
//       },
//       {
//           "id": 15990,
//           "logo_path": "/5cT4zwHA66uNAr2p3CcBDLddXu2.png",
//           "name": "FX Productions",
//           "origin_country": "US"
//       }
//   ],
//   "production_countries": [
//       {
//           "iso_3166_1": "US",
//           "name": "United States of America"
//       }
//   ],
//   "seasons": [
//       {
//           "air_date": null,
//           "episode_count": 13,
//           "id": 132992,
//           "name": "Specials",
//           "overview": "",
//           "poster_path": "/9GDlDVtkz6yHiRhBtld84s2YyOr.jpg",
//           "season_number": 0,
//           "vote_average": 0
//       },
//       {
//           "air_date": "2014-04-15",
//           "episode_count": 10,
//           "id": 60040,
//           "name": "Season 1",
//           "overview": "In January 2006, Lorne Malvo passes through Bemidji, Minnesota and influences put-upon insurance salesman Lester Nygaard with his malice and violence. Meanwhile, Deputy Molly Solverson and Duluth police officer Gus Grimly team up to solve a series of murders they believe may be linked to Malvo and Nygaard.",
//           "poster_path": "/matO9b040ibkviZV5mmDdKpQMEV.jpg",
//           "season_number": 1,
//           "vote_average": 8.4
//       },
//       {
//           "air_date": "2015-10-12",
//           "episode_count": 10,
//           "id": 62204,
//           "name": "Season 2",
//           "overview": "Season two's chapter takes you back to 1979 in Sioux Falls, South Dakota and Luverne, Minnesota. Lou Solverson, a young State Police Officer recently back from Vietnam, investigates a case involving a local crime gang, a major mob syndicate and small town beautician Peggy Blumquist along with her husband Ed, the local butcher’s assistant. Helping Lou piece things together is his father-in-law, Sheriff Hank Larsson. The investigation will lead them to a colorful cast of characters that includes Karl Weathers, the town lawyer of Luverne, Minnesota; Joe Bulo, the front man for the northern expansion of a Kansas City crime syndicate with his number two, Mike Milligan; and the Gerhardt crime family currently led by matriarch Floyd Gerhardt.",
//           "poster_path": "/xeKfy7m8rPl08mQ6ZfbkgOy6Hdj.jpg",
//           "season_number": 2,
//           "vote_average": 8.3
//       },
//       {
//           "air_date": "2017-04-19",
//           "episode_count": 10,
//           "id": 83007,
//           "name": "Season 3",
//           "overview": "December 2010, Minnesota. Emmit Stussy, the Parking Lot King of Minnesota, is a handsome, self-made, real estate mogul and family man - an American success story. His slightly younger brother, Ray Stussy, on the other hand is more of a cautionary tale. Balding, pot-bellied, Ray is the kind of guy who peaked in high school. Now a parole officer, Ray has a huge chip on his shoulder about the hand he's been dealt, and he blames his brother, until the arrival of a mysterious personality changes everything.",
//           "poster_path": "/dYHoNzcpQXzU2qBMZYbyOnrcuvi.jpg",
//           "season_number": 3,
//           "vote_average": 7.8
//       },
//       {
//           "air_date": "2020-09-27",
//           "episode_count": 11,
//           "id": 128208,
//           "name": "Season 4",
//           "overview": "In 1950s Kansas City, Missouri, two criminal syndicates have struck an uneasy peace. One Italian, one African-American. Together they control an alternate economy — that of exploitation, graft and drugs. This too is the history of America.  To cement their peace, the heads of both families have traded their youngest sons.",
//           "poster_path": "/9ZIhl17uFlXCNUputSEDHwZYIEJ.jpg",
//           "season_number": 4,
//           "vote_average": 6.8
//       },
//       {
//           "air_date": "2023-11-21",
//           "episode_count": 10,
//           "id": 353058,
//           "name": "Year Five",
//           "overview": "After an unexpected series of events lands Dorothy \"Dot\" Lyon in hot water with the authorities, this seemingly typical Midwestern housewife is suddenly plunged back into a life she thought she had left behind.",
//           "poster_path": "/6U9CPeD8obHzweikFhiLhpc7YBT.jpg",
//           "season_number": 5,
//           "vote_average": 8.2
//       }
//   ],
//   "spoken_languages": [
//       {
//           "english_name": "English",
//           "iso_639_1": "en",
//           "name": "English"
//       }
//   ],
//   "status": "Returning Series",
//   "tagline": "Consequence comes knocking.",
//   "type": "Scripted",
//   "vote_average": 8.304,
//   "vote_count": 2391
// }

export interface IRecievedCardData {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  character?: string;
}

export interface IRecievedTVData extends IRecievedCardData {
  first_air_date: string;
  name: string;
}

export interface IRecievedMovieData extends IRecievedCardData {
  release_date: string;
  title: string;
}

export interface IRecievedTrendingMovieData extends IRecievedMovieData {
  media_type: "movie";
}

export interface IRecievedTrendingTVData extends IRecievedTVData {
  media_type: "tv";
}

export interface IRecievedDataFromSearching {
  page: number;
  results: IRecievedTVData[] | IRecievedMovieData[];
  total_pages: number;
  total_results: number;
}

export interface ISinglePage_MovieProps {
  mainType: TGenresFor | "";
  cardData: IRecievedMovieData;
}

export interface ICredits {
  adult: boolean;
  department: string;
  gender: number;
  id: number;
  job: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export interface ICreditsCast extends ICredits {
  cast_id: number;
  character: string;
}

export interface ICreditsCrew extends ICredits {
  credit_id: string;
}

export interface IUseGetCreditsData {
  cast: ICombinedCast[] | ICreditsCast[] | ICreditsSerialsCast[];
  crew: ICombinedCrew[] | ICreditsCrew[];
  id: number;
}

export interface ISeasonData {
  air_date: string | null;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

export interface ICreditsSerialsCast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  roles: IRole[];
  total_episode_count: number;
  order: number;
}

export interface IRole {
  credit_id: string;
  character: string;
  episode_count: number;
}

export interface IRecievedPersonData {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
}

export interface ICombinedCast {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  character: string;
  credit_id: string;
  order: number;
  media_type: "movie" | "tv";
}
export interface ICombinedCrew {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credit_id: string;
  department: string;
  job: string;
  media_type: "movie" | "tv";
}

export interface ICombinedCredits {
  cast: ICombinedCast[];
  crew: ICombinedCrew[];
  id?: number;
}
