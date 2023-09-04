import { PaddlerSkills } from "./PaddlerSkills";

export interface TeamData {
  id: string;
  name: string;
  division: string;
  level: string;
  eligibility: string;
}

export interface ActiveLineupData {
  id: string;
  athlete: AthleteData;
  athleteId: string;
  position: number;
  updatedAt: Date;
  email?: string;
  lineupId?: string;
  teamId?: string;
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
  email?: string;
  isEmpty?: boolean;
  isAvailable?: boolean;
  isManager?: boolean;
  weight?: number;
  paddlerSkills?: PaddlerSkills;
  createdAt?: Date;
}

export interface RaceDayData {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
}