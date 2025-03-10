import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface IUseGetSearchParams<T> {
  getParam: string;
  defaultParam: T;
}

export const useGetSearchParams = <T extends string>({
  getParam,
  defaultParam,
}: IUseGetSearchParams<T>) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentParam, setCurrentParam] = useState<T>(
    (searchParams.get(getParam) as T) || defaultParam
  );

  useEffect(() => {
    setCurrentParam((searchParams.get(getParam) as T) || defaultParam);
  }, [searchParams, getParam, defaultParam]);

  return { searchParams, currentParam, setCurrentParam, setSearchParams };
};
