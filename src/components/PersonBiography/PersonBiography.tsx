import { useState } from "react";
import style from "./PersonBiography.module.css";

interface IPersonBiography {
  biographyText: string;
}
const getVisibleAndHiddenBiographyText = (text: string) => {
  const textArray = text.split(" ");
  const getVisibleLength = Math.floor(textArray.length / 4);

  return {
    visibleText: textArray.slice(0, getVisibleLength).join(" "),
    hiddenText: textArray.slice(getVisibleLength).join(" "),
  };
};

const PersonBiography = ({ biographyText }: IPersonBiography) => {
  const [isHiddenBioVisible, setIsHiddenBioVisible] = useState(false);

  const onSpanClick = () => {
    setIsHiddenBioVisible(!isHiddenBioVisible);
  };
  const biography = getVisibleAndHiddenBiographyText(biographyText);
  return (
    <div>
      <div className={style.visibleText}>
        <p>
          {biography.visibleText}{" "}
          <span
            className={`${style.dots} ${isHiddenBioVisible ? style.hidden : ""}`}
          >
            ...
          </span>
          <span
            className={`${style.hiddenText} ${
              isHiddenBioVisible ? style.visible : ""
            }`}
          >
            {" "}
            {biography.hiddenText}
            <span
              className={`${style.hideSpan} ${
                isHiddenBioVisible ? style.visibleSpan : ""
              }`}
              onClick={onSpanClick}
            >
              Hide
            </span>
          </span>
        </p>
      </div>
      <span
        className={`${style.more} ${isHiddenBioVisible ? style.hidden : ""}`}
        onClick={onSpanClick}
      >
        More
      </span>
    </div>
  );
};
export default PersonBiography;
