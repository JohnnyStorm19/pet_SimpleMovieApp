import { ITvCard_Single, TGenresFor } from "../../types/models";
import DetailsGroup from "./DetailsGroup";
import Loader from "../Loader/Loader";
import MyError from "../Error/MyError";
import { useSearchById } from "@/shared/hooks";

// todo удалить

export const TVDetails = ({ type }: { type: TGenresFor }) => {
  // const [{ searchResult, searchLoader, searchError }] = useSearchById(
  //   type,
  //   numberId,
  //   shouldSearch,
  //   setShouldSearch
  // );

  const {
    data: searchResult,
    isLoading: searchLoader,
    isError: searchError,
  } = useSearchById(type);

  return (
    <div>
      {searchLoader && <Loader />}
      {searchError && <MyError />}

      {searchResult && (
        <DetailsGroup detailsArray={searchResult as ITvCard_Single} />
      )}
    </div>
  );
};
