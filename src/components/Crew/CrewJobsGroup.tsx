import { useNavigate } from "react-router-dom";
import { ICreditsCrew } from "../../types/models";
import style from "./CrewJobsGroup.module.css";
import { useMemo } from "react";

interface ICrewJobsGroupProps {
  crewArray: ICreditsCrew[];
}

const getUniqueJobs = (arr: ICreditsCrew[]): string[] => {
  const jobs = arr.map((person) => person.job);

  return Array.from(new Set(jobs));
};

export const CrewJobsGroup = ({ crewArray }: ICrewJobsGroupProps) => {
  const navigate = useNavigate();
  const jobsWithCrew = useMemo(() => {
    const uniqueJobs: string[] = getUniqueJobs(crewArray);
    const uniqueJobsArrWithCrewSlot: {
      job: string;
      persons: string[];
      id: number;
    }[] = uniqueJobs.map((job) => {
      return { job, persons: [], id: 0 };
    });
    crewArray.forEach((person) => {
      const index = uniqueJobsArrWithCrewSlot.findIndex(
        (crew) => crew.job === person.job
      );
      uniqueJobsArrWithCrewSlot[index].persons.push(person.name);
      uniqueJobsArrWithCrewSlot[index].id = person.id;
    });
    return uniqueJobsArrWithCrewSlot;
  }, [crewArray]);

  const onPersonClick = (id: number) => {
    navigate(`/person/${id}`);
  };

  return (
    <div className={style.crewJobs__container}>
      {jobsWithCrew.map((crew) => {
        return (
          <div key={crew.id}>
            <h4 className={style.job}>{crew.job}: </h4>
            {crew.persons.map((person) => {
              return (
                <div
                  key={person}
                  onClick={() => onPersonClick(crew.id)}
                  className={style.person__name}
                >
                  {person}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

// const doesNotExistWritingJob = (crewArray: ICreditsCrew[]) => {
//   return crewArray.filter((person) => person.job === "Writer").length === 0;
// };

// const hasJob = (obj: { job: string }, crewArray: ICreditsCrew[]) => {
//   const res = crewArray.filter((person) => person.job === obj.job);
//   return res.length > 0;
// };
// const filterJobs = (obj: { job: string }, crewArray: ICreditsCrew[]) => {
//   return crewArray.filter((person) => person.job === obj.job);
// };

// const crewJobs = [
//   { key: 0, job: "Producer" },
//   { key: 1, job: "Writer" },
//   { key: 2, job: "Director" },
//   { key: 4, job: "Editor" },
//   { key: 5, job: "Original Music Composer" },
//   { key: 6, job: "Director of Photography" },
// ];

// if (doesNotExistWritingJob(crewArray)) {
//   crewJobs.splice(1, 1, { key: 1, job: "Screenplay" });
// }

{
  /* {jobsWithCrew.map((job) => {
        return crewArray.map((item) => {
          if (item.job === job) {
            return (
              <div key={item.id}>
                <h4 className={style.job}>{item.job}: </h4>
                <div
                  key={item.credit_id}
                  onClick={() => onPersonClick(item.id)}
                  className={style.person__name}
                >
                  {item.name}
                </div>
              </div>
            );
          }
        });
      })} */
}
{
  /* {crewJobs.map((obj) => {
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
      })} */
}
