import { useLayoutEffect, useState } from "react";

// const queries = [
//     '(max-width: 639px)',
//     '(min-width: 640px) and (max-width: 1023px)',
//     '(min-width: 1024px)'
// ]

interface MediaQueryValues {
  isMobile: boolean;
  isDesktop: boolean;
  isTablet: boolean;
}
const queries = [
  "(max-width: 639px)",
  "(min-width: 640px) and (max-width: 1023px)",
  "(min-width: 1024px)",
];

export const useMatchMedia = (): MediaQueryValues => {
  const mediaQueryList = queries.map((query) => matchMedia(query));
  const getValues = () => mediaQueryList.map((mql) => mql.matches);

  const [values, setValues] = useState(getValues);
  useLayoutEffect(() => {
    const handler = () => setValues(getValues);
    mediaQueryList.forEach((mql) => mql.addEventListener("change", handler));

    return () =>
      mediaQueryList.forEach((mql) =>
        mql.removeEventListener("change", handler)
      );
  });

  return ["isMobile", "isTablet", "isDesktop"].reduce(
    (acc, screen, index) => ({
      ...acc,
      [screen]: values[index],
    }),
    {}
  ) as { isMobile: boolean; isTablet: boolean; isDesktop: boolean };
};
