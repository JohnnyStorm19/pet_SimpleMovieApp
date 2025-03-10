import style from "./index.module.css";
import { SwitcherBtn } from "@/shared/ui";

type SwitcherOption<T extends string> = {
  value: T;
  label: string;
};

interface IDetailsSwitcherProps<T extends string> {
  options: SwitcherOption<T>[];
  activeSwitcher: T;
  onSwitch: (param: T) => void;
}

export const DetailsSwitcher = <T extends string>({
  options,
  activeSwitcher,
  onSwitch,
}: IDetailsSwitcherProps<T>) => {
  return (
    <div className={style.details_menu}>
      {options.map(({ value, label }) => (
        <SwitcherBtn
          key={value}
          handleBtnClick={() => onSwitch(value)}
          isClicked={activeSwitcher === value}
        >
          {label}
        </SwitcherBtn>
      ))}
    </div>
  );
};
