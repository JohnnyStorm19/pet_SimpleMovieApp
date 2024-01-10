import { useState } from "react";
import { useParams } from "react-router-dom";
import CastItem_Full from "../../components/Cast/CastItem_Full";
import { useGetCredits } from "../../hooks/useGetCredits";
import style from './TVCastFullPage.module.css'
import PageHeader from "../../components/UI/PageHeader/PageHeader";
import { ICreditsSerialsCast } from "../../types/models";
import Loader from "../../components/Loader/Loader";

const TVCastFullPage = () => {
  const type = 'aggregateTV';
  const { id } = useParams();
  const [shouldSearch, setShouldSearch] = useState(true);

  let numberId;
  if (id) {
    numberId = Number(id);
  }
  const [{ credits, creditsLoader, creditsError }] = useGetCredits(type, numberId, shouldSearch, setShouldSearch);

  return (
    <div className={style.tvCast_container}>
      <PageHeader />
      {creditsLoader && <Loader />}
      <h1 className={style.title}>Full Cast</h1>
      {credits && (
        <div className={style.full_cast_cards}>
          {credits.cast.map((person) => {
            return <CastItem_Full key={person.id} person={person as ICreditsSerialsCast} />;
          })}
        </div>
      )}
    </div>
  );
};

export default TVCastFullPage;
