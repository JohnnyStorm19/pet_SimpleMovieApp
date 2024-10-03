export interface ICredits {
  adult: boolean;
  department: string;
  gender: number;
  id: number;
  job: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export interface ICreditsCast extends ICredits {
  cast_id: number;
  character: string;
}

export interface ICreditsCrew extends ICredits {
  credit_id: string;
}

export interface IRole {
  credit_id: string;
  character: string;
  episode_count: number;
}

export interface ICreditsSerialsCast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  roles: IRole[];
  total_episode_count: number;
  order: number;
}
