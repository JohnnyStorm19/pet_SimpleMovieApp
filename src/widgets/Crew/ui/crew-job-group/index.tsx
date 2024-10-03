import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ICreditsCrew } from "@/types/models";
import style from "./index.module.css";
import { getUniqueJobs } from "../../lib/getUniqueJobs";

interface ICrewJobsGroupProps {
  crewArray: ICreditsCrew[];
}
type TUniqueJobWithCrewSlot = {
  job: string;
  persons: { name: string; id: number }[];
  jobId: string;
};

export const CrewJobsGroup = ({ crewArray }: ICrewJobsGroupProps) => {
  const navigate = useNavigate();
  // todo посмотреть можно ли декомпозировать функции внутри useMemo
  const jobsWithCrew = useMemo(() => {
    const uniqueJobs: string[] = getUniqueJobs(crewArray);
    const uniqueJobsArrWithCrewSlot: TUniqueJobWithCrewSlot[] = uniqueJobs.map(
      (job) => {
        return { job, persons: [{ name: "", id: 0 }], jobId: "" };
      }
    );
    crewArray.forEach((person) => {
      const index = uniqueJobsArrWithCrewSlot.findIndex(
        (crew) => crew.job === person.job
      );
      uniqueJobsArrWithCrewSlot[index].persons.push({
        name: person.name,
        id: person.id,
      });
      uniqueJobsArrWithCrewSlot[index].jobId = person.credit_id;
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
          <div key={crew.jobId}>
            <h4 className={style.job}>{crew.job}: </h4>
            {crew.persons.map((person) => {
              return (
                <div
                  key={person.id + crew.jobId}
                  onClick={() => onPersonClick(person.id)}
                  className={style.person__name}
                >
                  {person.name}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

// if (doesNotExistWritingJob(crewArray)) {
//   crewJobs.splice(1, 1, { key: 1, job: "Screenplay" });
// }

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
