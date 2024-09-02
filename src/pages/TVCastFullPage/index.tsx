import CastItem_Full from "@/components/Cast/CastItem_Full";
import MyError from "@/components/Error/MyError";
import Loader from "@/components/Loader/Loader";
import { useGetCredits } from "@/hooks/useGetCredits";
import { ICreditsSerialsCast } from "@/types/models";
import { useState } from "react";
import { useParams } from "react-router-dom";
import style from "./TVCastFullPage.module.css";

export const TVCastFullPage = () => {
  const type = "aggregateTV";
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
    <div className={style.tvCast_container}>
      {creditsLoader && <Loader />}
      {creditsError && <MyError />}

      <h1 className={style.title}>Full Cast</h1>
      {credits && (
        <div className={style.full_cast_cards}>
          {credits.cast.map((person) => {
            return (
              <CastItem_Full
                key={person.id}
                person={person as ICreditsSerialsCast}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
