import { PaddlerSkills } from "./PaddlerSkills";

export interface TeamData {
  id: string;
  name: string;
  division: string;
  level: string;
  eligibility: string;
}

export interface ActiveLineupData {
  athlete: any;
  athleteId: string;
  id: string;
  position: number;
  updatedAt: Date;
}

export interface LineupData {
  id: string;
  name: string;
  level: string;
  division: string;
  eligibiligy: string;
  createdAt: Date;
  lineups: SingleTeamLineupData;
}

export interface SingleTeamLineupData {
  id: string;
  name: string;
  teamId: string;
}

export interface RosterData {
  teamId: string;
  athleteId: string;
  updatedAt: Date;
  athlete: AthleteData;
}

export interface AthleteData {
  id: string;
  firstName?: string;
  lastName?: string;
  eligibility?: string;
  paddleSide?: string;
  notes?: string;
  isEmpty?: boolean;
  isAvailable?: boolean;
  email?: string;
  isManager?: boolean;
  weight?: number;
  paddlerSkills?: PaddlerSkills;
}
