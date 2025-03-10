import { Loader, MyError } from "@/shared/ui";
import { ICreditsCrew, TGenresFor } from "../../../types/models";
import { useGetCredits } from "@/shared/hooks";
import { CrewJobsGroup } from "./crew-job-group";

type TCrewProps = Exclude<TGenresFor, "trending">;

export const Crew = ({ type }: { type: TCrewProps }) => {
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
