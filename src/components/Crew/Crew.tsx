import { ICreditsCrew, TGenresFor } from "../../types/models";
import { CrewJobsGroup } from "./CrewJobsGroup";
import Loader from "../Loader/Loader";
import MyError from "../Error/MyError";
import { useGetCredits } from "@/shared/hooks";

// todo убрать

export const Crew = ({ type }: { type: TGenresFor }) => {
  const {
    data: credits,
    isLoading: creditsLoader,
    isError: creditsError,
  } = useGetCredits(type);

  return (
    <div>
      {creditsLoader && <Loader />}
      {creditsError && <MyError />}

      {credits && <CrewJobsGroup crewArray={credits.crew as ICreditsCrew[]} />}
    </div>
  );
};
