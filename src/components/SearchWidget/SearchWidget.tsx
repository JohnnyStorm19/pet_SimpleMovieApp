import { useState } from "react";
import { IFormData, ISearchWidgetProps } from "../../types/models";
import style from './SearchWidget.module.css'

//todo 1. стилизовать валидацию инпута

const SearchWidget: React.FC<ISearchWidgetProps> = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState<IFormData>({ searchInput: "" });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
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
  };
  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <label htmlFor="form-input" className={style.searching_glass}></label>
      <input
        className={style.form_input}
        id="form-input"
        type="search"
        name="searchInput"
        value={formData.searchInput}
        onChange={onInputChange}
        placeholder="I am looking for..."
        autoComplete="off"
        required
      />
      <button type="submit" className={style.send_btn}></button>
    </form>
  );
};

export default SearchWidget;
