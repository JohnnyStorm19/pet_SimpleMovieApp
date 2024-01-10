import { Route, Routes } from "react-router-dom";
import "./App.css";
import MoviePage from "./pages/MoviePage/MoviePage";
import TVseriesPage from "./pages/TVSeriesPage/TVseriesPage";
import TrendingPage from "./pages/TrendingPage/TrendingPage";
import MainPage from "./pages/MainPage/MainPage";
import SinglePage_Movie from "./pages/SinglePage_Movie/SinglePage_Movie";
import SinglePage_TVSeries from "./pages/SinglePage_TVSeries/SinglePage_TVSeries";
import TVCastFullPage from "./pages/TVCastFullPage/TVCastFullPage";
import PersonPage from "./pages/PersonPage/PersonPage";

function App() {
  // const store = {
  //   moviesStore: {
  //     currentSelectedGenres: [],
  //     currentSearchType: "keyword",
  //     currentPage: 0,
  //   },
  //   tvSeriesStore: {
  //     currentSelectedGenres: [],
  //     currentSearchType: "keyword",
  //     currentPage: 0,
  //   },
  // };

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/trending" element={<TrendingPage />} />
      <Route path="/movie" element={<MoviePage />} />
      <Route path="/tv" element={<TVseriesPage />} />

      <Route path="/movie/:id" element={<SinglePage_Movie />} />
      <Route path="/tv/:id" element={<SinglePage_TVSeries />} />
      <Route path="/tv/:id/cast-full" element={<TVCastFullPage />} />

      <Route path="/trending/movie/:id" element={<SinglePage_Movie />} />
      <Route path="/trending/tv/:id" element={<SinglePage_TVSeries />} />
      <Route path="/trending/tv/:id/cast-full" element={<TVCastFullPage />} />
      <Route path="/person/:id" element={<PersonPage />}/>
    </Routes>
  );
}

export default App;
