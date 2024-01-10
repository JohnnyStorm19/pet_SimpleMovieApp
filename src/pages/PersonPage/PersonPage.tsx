import style from "./PersonPage.module.css";
import { useParams } from "react-router-dom";
import { useSearchById } from "../../hooks/useSearchById";
import { useState } from "react";
import { REQUEST_URLS } from "../../services/api/requestApi";
import { useGetCredits } from "../../hooks/useGetCredits";
import ItemCardsList from "../../components/ItemCardsList/ItemCardsList";
import { getFilteredAndSortedArrayOfCards } from "../../services/utils/getSortedAndFilteredBy";
import SortingSwitcher from "../../components/UI/SortingSwitcher/SortingSwitcher";
import { getPersonsJob } from "../../services/utils/getPersonsJob";
import PageHeader from "../../components/UI/PageHeader/PageHeader";
import PersonBiography from "../../components/PersonBiography/PersonBiography";
import { ICombinedCast, ICombinedCrew } from "../../types/models";
import Loader from "../../components/Loader/Loader";

type TContentType = "movie" | "tv" | "all";
type TProjectTime = "newest" | "earliest" | "";

const PersonPage = () => {
  const personSearchType = "personBio";
  const creditsType = "combined";

  const [shouldSearchBio, setShouldSearchBio] = useState(true);
  const [shouldSearchCredits, setShouldSearchCredits] = useState(true);
  const [sortByJob, setSortByJob] = useState("");
  const [sortByProjectTime, setSortByProjectTime] = useState<
    "newest" | "earliest" | ""
  >("newest");
  const [sortByContentType, setSortByContentType] = useState<
    "movie" | "tv" | "all"
  >("all");

  const { id } = useParams();
  let numberId;
  if (id) {
    numberId = Number(id);
  }

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

  const sortingSwitcherChangeHandler = (
    job: string,
    projectTime: TProjectTime,
    contentType: TContentType
  ) => {
    setSortByJob(job);
    setSortByProjectTime(projectTime);
    setSortByContentType(contentType);
  };

  return (
    <div className={style.personPage_container}>
      <PageHeader />
      
      {searchLoader && <Loader />}
      {creditsLoader && <Loader />}

      {searchResult && "name" in searchResult && (
        <header className={style.person_name_header}>
          <h1 className={style.person_name}>{searchResult.name}</h1>
        </header>
      )}
      {searchResult && credits && (
        <div className={style.personPage_content_wrapper}>
          <section className={style.projects_section}>
            <div className={style.content_nav}>
              <SortingSwitcher
                options={getPersonsJob(credits.crew as ICombinedCrew[], credits.cast as ICombinedCast[])}
                onChangeHandler={sortingSwitcherChangeHandler}
              />
            </div>
            <div>
              <div className={style.projects_count}>
                Projects:{" "}
                {
                  getFilteredAndSortedArrayOfCards({
                    data: { cast: credits.cast as ICombinedCast[], crew: credits.crew as ICombinedCrew[] },
                    sortType: sortByProjectTime,
                    filterContentType: sortByContentType,
                    filterJobType: sortByJob,
                  }).length
                }
              </div>
              {sortByJob === "Actor" ? (
                <ItemCardsList
                  recievedData={
                    getFilteredAndSortedArrayOfCards({
                      data: { cast: credits.cast as ICombinedCast[], crew: credits.crew as ICombinedCrew[] },
                      sortType: sortByProjectTime,
                      filterContentType: sortByContentType,
                      filterJobType: "Actor",
                    }) as ICombinedCrew[] | ICombinedCast[]
                  }
                  mainType={creditsType}
                />
              ) : (
                <ItemCardsList
                  recievedData={
                    getFilteredAndSortedArrayOfCards({
                      data: { cast: credits.cast as ICombinedCast[], crew: credits.crew as ICombinedCrew[] },
                      sortType: sortByProjectTime,
                      filterContentType: sortByContentType,
                      filterJobType: sortByJob,
                    }) as ICombinedCrew[] | ICombinedCast[]
                  }
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

export default PersonPage;
