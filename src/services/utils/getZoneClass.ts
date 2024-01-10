export const getZoneClass = (rating: number) => {
    if (rating < 5) {
      return 'red_zone';
    } else if (rating > 6.9) {
      return 'green_zone';
    }
    return 'gray_zone';
};