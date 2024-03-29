import { PaddlerSkills } from "./PaddlerSkills";

export interface LoginFormData {
  email: string;
  password: string;
}

export interface CreateNewTeamFormData {
  name: string;
  division: string;
  level: string;
  eligibility: string;
}

export interface CreateNewAthleteFormData {
  teamId: string;
  email: string;
  firstName: string;
  lastName: string;
  eligibility: "O" | "W" | null;
  availability: "available" | "unavailable" | null | undefined;
  paddleSide: "L" | "R" | "B" | "N" | null;
  weight: string | null;
  paddlerSkills: PaddlerSkills;
  notes: string;
}

export interface SaveNewLineupFormData {
  activeLineupId: string;
  lineupName: string;
  boatOrder: (string | null)[];
}
