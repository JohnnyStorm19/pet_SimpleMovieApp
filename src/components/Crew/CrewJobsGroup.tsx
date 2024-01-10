import { useNavigate } from "react-router-dom";
import { ICreditsCrew } from "../../types/models";
import style from './CrewJobsGroup.module.css';

interface ICrewJobsGroupProps {
  crewArray: ICreditsCrew[];
}

const doesNotExistWritingJob = (crewArray: ICreditsCrew[]) => {
  return crewArray.filter((person) => person.job === "Writer").length === 0;
};

const hasJob = (obj: {job: string}, crewArray: ICreditsCrew[]) => {
  const res = crewArray.filter((person) => person.job === obj.job);
  return res.length > 0;
};
const filterJobs = (obj: {job: string}, crewArray: ICreditsCrew[]) => {
  return crewArray.filter((person) => person.job === obj.job);
};

const crewJobs = [
  { key: 0, job: "Producer" },
  { key: 1, job: "Writer" },
  { key: 2, job: "Director" },
  { key: 4, job: "Editor" },
  { key: 5, job: "Original Music Composer" },
  { key: 6, job: "Director of Photography" },
];

const CrewJobsGroup = ({ crewArray }: ICrewJobsGroupProps) => {
  const navigate = useNavigate();

  if (doesNotExistWritingJob(crewArray)) {
    crewJobs.splice(1, 1, { key: 1, job: "Screenplay" });
  }

  const onPersonClick = (id: number) => {
    navigate(`/person/${id}`);
  };

  return (
    <div className={style.crewJobs__container}>
      {crewJobs.map((obj) => {
        if (
          obj.job === "Director of Photography" ||
          obj.job === "Original Music Composer"
        ) {
          return (
            <div key={obj.key}>
              {hasJob(obj, crewArray) && (
                <>
                  <h4 className={style.job}>{obj.job}: </h4>
                  {filterJobs(obj, crewArray).map((person) => {
                    return (
                      <div
                        key={person.credit_id}
                        onClick={() => onPersonClick(person.id)}
                        className={style.person__name}
                      >
                        {person.name}
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          );
        } else if (obj.job === "Screenplay") {
          return (
            <div key={obj.key}>
              {hasJob(obj, crewArray) && (
                <>
                  <h4 className={style.job}>{obj.job}: </h4>
                  {filterJobs(obj, crewArray).map((person) => {
                    return (
                      <div
                        key={person.credit_id}
                        onClick={() => onPersonClick(person.id)}
                        className={style.person__name}
                      >
                        {person.name}
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          );
        }
        return (
          <div key={obj.key}>
            {hasJob(obj, crewArray) && (
              <>
                <h4 className={style.job}>
                  {obj.job}
                  {filterJobs(obj, crewArray).length > 1 ? "s" : ""}:{" "}
                </h4>
                {filterJobs(obj, crewArray).map((person) => {
                  return (
                    <div
                      key={person.credit_id}
                      onClick={() => onPersonClick(person.id)}
                      className={style.person__name}
                    >
                      {person.name}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CrewJobsGroup;
