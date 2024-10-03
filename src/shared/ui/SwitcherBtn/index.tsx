import style from "./index.module.css";

interface ISwitcherBtn extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  handleBtnClick: (name: string) => void;
  isClicked: boolean;
  children: React.ReactNode;
}

export const SwitcherBtn = ({
  name = "",
  handleBtnClick,
  isClicked,
  children,
}: ISwitcherBtn) => {
  return (
    <button
      className={`${style.switcher__btn} ${isClicked ? style.clicked : ""}`}
      onClick={() => handleBtnClick(name)}
      name={name}
    >
      {children}
    </button>
  );
};
