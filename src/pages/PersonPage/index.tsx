import MyError from "@/components/Error/MyError";
import Loader from "@/components/Loader/Loader";
import PersonBiography from "@/components/PersonBiography/PersonBiography";
import SortingSwitcher from "@/components/UI/SortingSwitcher/SortingSwitcher";
import { ItemCardsList } from "@/entities/item-card";
import { useGetCredits } from "@/hooks/useGetCredits";
import { useSearchById } from "@/hooks/useSearchById";
import { REQUEST_URLS } from "@/services/api/requestApi";
import { useState } from "react";
import { useParams } from "react-router-dom";
import style from "./PersonPage.module.css";
import { useGetPersonPageData } from "./lib/hooks/useGetPersonPageData";

export const PersonPage = () => {
  const personSearchType = "personBio";
  const creditsType = "combined";

  const [shouldSearchBio, setShouldSearchBio] = useState(true);
  const [shouldSearchCredits, setShouldSearchCredits] = useState(true);

  const { id } = useParams();
  const numberId = id ? Number(id) : undefined;

  const [{ searchResult, searchLoader, searchError }] = useSearchById(
    personSearchType,
    numberId,
    shouldSearchBio,
    setShouldSearchBio
  );
  const [{ credits, creditsLoader, creditsError }] = useGetCredits(
    creditsType,
    numberId,
    shouldSearchCredits,
    setShouldSearchCredits
  );
  const {
    cardsListDataByActorFiltered,
    cardsListDataByOthersFiltered,
    projectCount,
    personsJob,
    sortByJob,
    sortingSwitcherChangeHandler,
  } = useGetPersonPageData({ credits });

  return (
    <div className={style.personPage_container}>
      {(searchLoader || creditsLoader) && <Loader />}
      {(searchError || creditsError) && <MyError />}

      {searchResult && "name" in searchResult && (
        <h1 className={style.person_name}>{searchResult.name}</h1>
      )}
      {searchResult && credits && (
        <div className={style.personPage_content_wrapper}>
          <section className={style.projects_section}>
            <SortingSwitcher
              options={personsJob}
              onChangeHandler={sortingSwitcherChangeHandler}
            />

            <div>
              <div className={style.projects_count}>
                Projects: {projectCount}
              </div>
              {sortByJob === "Actor" ? (
                <ItemCardsList
                  recievedData={cardsListDataByActorFiltered}
                  mainType={creditsType}
                />
              ) : (
                <ItemCardsList
                  recievedData={cardsListDataByOthersFiltered}
                  mainType={creditsType}
                />
              )}
            </div>
          </section>
          <aside className={style.person_bio_aside}>
            <div className={style.img_container}>
              {searchResult && "profile_path" in searchResult && (
                <img
                  src={`${REQUEST_URLS.images.IMG_300}${searchResult.profile_path}`}
                  alt={searchResult.name}
                  loading="lazy"
                />
              )}
            </div>
            <div className={style.biography_container}>
              {searchResult &&
                "biography" in searchResult &&
                searchResult.biography?.length > 0 && (
                  <PersonBiography biographyText={searchResult.biography} />
                )}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};
