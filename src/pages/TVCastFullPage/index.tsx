import { FullCastItem } from "@/entities/cast";
import { ICreditsSerialsCast } from "@/entities/cast/model/types.interface";
import { useGetCredits } from "@/shared/hooks";
import { Loader, MyError, PageTitle } from "@/shared/ui";
import style from "./TVCastFullPage.module.css";

export const TVCastFullPage = () => {
  const type = "aggregateTV";

  const {
    data: credits,
    isLoading: creditsLoader,
    isError: creditsError,
  } = useGetCredits(type);

  return (
    <div className={style.tvCast_container}>
      {creditsLoader && <Loader />}
      {creditsError && <MyError />}

      <PageTitle textContent="Full Cast" />

      {credits && (
        <div className={style.full_cast_cards}>
          {credits.cast.map((person) => {
            return (
              <FullCastItem
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
