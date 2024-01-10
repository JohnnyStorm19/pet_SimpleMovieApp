import { useParams } from "react-router-dom";
import { ICreditsCrew, TGenresFor } from "../../types/models";
import { useState } from "react";
import { useGetCredits } from "../../hooks/useGetCredits";
import CrewJobsGroup from "./CrewJobsGroup";
import Loader from "../Loader/Loader";

const Crew = ({ type }: { type: TGenresFor }) => {
  const { id } = useParams();
  const [shouldSearch, setShouldSearch] = useState(true);
  let numberId;
  if (id) {
    numberId = Number(id);
  }
  const [{ credits, creditsLoader, creditsError }] = useGetCredits(
    type,
    numberId,
    shouldSearch,
    setShouldSearch
  );

  return (
    <div>
      {creditsLoader && <Loader />}
      {credits && (
        <CrewJobsGroup crewArray={credits.crew as ICreditsCrew[]}/>
      )}
    </div>
  );
};

export default Crew;
