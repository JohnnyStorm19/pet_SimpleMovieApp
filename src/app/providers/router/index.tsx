import { AppLayout } from "@/app/layout";
import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const MainPage = lazy(() =>
  import("@/pages").then((module) => ({ default: module.MainPage }))
);
const TrendingPage = lazy(() =>
  import("@/pages").then((module) => ({ default: module.TrendingPage }))
);
const MoviePage = lazy(() =>
  import("@/pages").then((module) => ({ default: module.MoviePage }))
);
const TVseriesPage = lazy(() =>
  import("@/pages").then((module) => ({ default: module.TVseriesPage }))
);
const SinglePage_Movie = lazy(() =>
  import("@/pages").then((module) => ({ default: module.SinglePage_Movie }))
);
const SinglePage_TVSeries = lazy(() =>
  import("@/pages").then((module) => ({ default: module.SinglePage_TVSeries }))
);
const TVCastFullPage = lazy(() =>
  import("@/pages").then((module) => ({ default: module.TVCastFullPage }))
);
const PersonPage = lazy(() =>
  import("@/pages").then((module) => ({ default: module.PersonPage }))
);
const PageNotFound = lazy(() =>
  import("@/pages").then((module) => ({ default: module.PageNotFound }))
);

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<MainPage />} />
          <Route path="/trending" element={<TrendingPage />} />
          <Route path="/movie" element={<MoviePage />} />
          <Route path="/tv" element={<TVseriesPage />} />

          <Route path="/movie/:id" element={<SinglePage_Movie />} />
          <Route path="/tv/:id" element={<SinglePage_TVSeries />} />
          <Route path="/tv/:id/cast-full" element={<TVCastFullPage />} />

          <Route path="/trending/movie/:id" element={<SinglePage_Movie />} />
          <Route path="/trending/tv/:id" element={<SinglePage_TVSeries />} />
          <Route
            path="/trending/tv/:id/cast-full"
            element={<TVCastFullPage />}
          />
          <Route path="/person/:id" element={<PersonPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
