import { Loader, MyError } from "@/shared/ui";
import { ICreditsCrew, TGenresFor } from "../../../types/models";
import { useGetCredits } from "@/shared/hooks";
import { CrewJobsGroup } from "./crew-job-group";

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
