import { ICombinedCast, ICombinedCrew } from "../../types/models";

export const getPersonsJob = (crewArray: ICombinedCrew[], castArray: ICombinedCast[]) => {
    const allJobs = crewArray.map(person => person.job)
    const uniqueJobs =  Array.from(new Set(allJobs)).map(job => ({job, quantity: 0}));

    const res = uniqueJobs.map(job => {
        const jobQuantity = crewArray.filter(person => person.job === job.job);
        return {job: job.job, quantity: jobQuantity.length};
    })

    if (castArray.length > 0) {
        res.push({job: "Actor", quantity: castArray.length});
    }
    return res;
    
}