import { useEffect, useState } from "react";
import style from './SortingSwitcher.module.css';

type TContentType = "movie" | "tv" | "all";
type TProjectTime = "newest" | "earliest" | "";
interface IJobObj {
  job: string;
  quantity: number;
}

interface ISortingSwitcherProps {
  options: IJobObj[];
  onChangeHandler: (
    job: string,
    projectTime: TProjectTime,
    contentType: TContentType
  ) => void
}

const getDefaultSelectedJob = (options: IJobObj[]) => {
  return options.sort((a, b) => b.quantity - a.quantity)[0].job;
};

const SortingSwitcher = ({ options, onChangeHandler }: ISortingSwitcherProps) => {
  const [selectedDateValue, setSelectedDateValue] = useState<TProjectTime>("newest");
  const [selectedJobValue, setSelectedJobValue] = useState(
    getDefaultSelectedJob(options)
  );
  const [selectedType, setSelectedType] = useState<TContentType>("all");

  const handleSelectDateChange = (event: React.SyntheticEvent<HTMLSelectElement>) => {
    setSelectedDateValue(event.currentTarget.value as TProjectTime);
    onChangeHandler(selectedJobValue, selectedDateValue, selectedType);
  };
  const handleSelectJobChange = (event: React.SyntheticEvent<HTMLSelectElement>) => {
    setSelectedJobValue(event.currentTarget.value);
    onChangeHandler(selectedJobValue, selectedDateValue, selectedType);
  };
  const handleSelectTypeChange = (event: React.SyntheticEvent<HTMLSelectElement>) => {
    setSelectedType(event.currentTarget.value as TContentType);
    onChangeHandler(selectedJobValue, selectedDateValue, selectedType);
  };

  useEffect(() => {
    onChangeHandler(selectedJobValue, selectedDateValue, selectedType); // дефолтное значение
  }, [selectedDateValue, selectedJobValue, selectedType, onChangeHandler]);

  return (
    <div className={style.sortingSwitcher_container}>
      <label>
        Select projects by job
        <select
          name="jobs-sort"
          value={selectedJobValue}
          onChange={handleSelectJobChange}
        >
          {options.map((obj, id) => (
            <option key={id} value={obj.job}>
              {obj.job} - {obj.quantity} projects
            </option>
          ))}
        </select>
      </label>

      <label>
        Sort by release date
        <select
          name="release_date-sort"
          value={selectedDateValue}
          onChange={handleSelectDateChange}
        >
          <option value="newest">From newest project</option>
          <option value="earliest">From earliest project</option>
        </select>
      </label>

      <label>
        Sort by type
        <select
          name="type-sort"
          value={selectedType}
          onChange={handleSelectTypeChange}
        >
          <option value="all">All</option>
          <option value="movie">Movie</option>
          <option value="tv">Serials/TV-shows</option>
        </select>
      </label>
    </div>
  );
};

export default SortingSwitcher;
