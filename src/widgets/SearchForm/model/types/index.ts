export interface ISearchFormData {
  searchInput: string;
}
export interface ISearchFormProps {
  onFormSubmit: (formData: ISearchFormData) => void;
}
