export const getZoneClass = (rating: number) => {
  switch (true) {
    case rating < 5:
      return "red_zone";
    case rating > 6.9:
      return "green_zone";
    default:
      return "gray_zone";
  }
};
