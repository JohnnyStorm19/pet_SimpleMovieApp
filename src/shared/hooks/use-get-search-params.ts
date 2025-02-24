import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface IUseGetSearchParams {
  getParam: string;
  defaultParam: string;
}

export const useGetSearchParams = ({
  getParam,
  defaultParam,
}: IUseGetSearchParams) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentParam, setCurrentParam] = useState(
    searchParams.get(getParam) || defaultParam
  );

  useEffect(() => {
    setCurrentParam(searchParams.get(getParam) || defaultParam);
  }, [searchParams, getParam, defaultParam]);

  return { searchParams, currentParam, setCurrentParam, setSearchParams };
};
