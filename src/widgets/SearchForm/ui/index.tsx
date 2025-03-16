import { useState } from "react";
import style from "./SearchForm.module.css";
import clsx from "clsx";
import { FormInput } from "@/shared/ui";
import { ISearchFormData, ISearchFormProps } from "../model/types";

// todo прикрепить react-hook-form

export const SearchForm: React.FC<ISearchFormProps> = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState<ISearchFormData>({
    searchInput: "",
  });
  const [formError, setFormError] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!formData.searchInput) {
      setFormError(true);
      return;
    }

    onFormSubmit(formData);

    setFormData({
      ...formData,
      searchInput: "",
    });
  };

  const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
    setFormError(false);
  };
  return (
    <div className={style.form_container}>
      <form
        onSubmit={handleSubmit}
        className={clsx(style.form, formError && style.formError)}
      >
        <FormInput
          LabelEl={
            <label
              htmlFor="form-input"
              className={style.searching_glass}
            ></label>
          }
          onChange={onInputChange}
          id="form-input"
          type="search"
          name="searchInput"
          value={formData.searchInput}
          placeholder="I am looking for..."
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className={style.send_btn}
        ></button>
      </form>
      {formError && (
        <span className={style.formErrorText}>Поле для ввода пусто</span>
      )}
    </div>
  );
};
