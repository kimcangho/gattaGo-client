export interface PlanOrderData {
  id: string;
  section: string;
  sectionId: string;
}

export interface RegattaSectionData {
  id: string;
  regattaName: string;
  regattaStartDate: Date;
  regattaEndDate: Date;
  regattaAddress: string;
  regattaContact: string;
  regattaEmail: string;
  regattaPhone: string;
}

export interface MapSectionData {
  id: string;
  mapName: string;
  mapLongitude: number;
  mapLatitude: number;
  mapZoom: number;
}

export interface EventSectionData {
  id: string;
  eventName: string;
  eventDistance: string;
  eventLane: String;
  eventTime: Date;
}

export interface LineupSectionData {
  id: string;
  lineupName: string;
  boatOrder: (string | null)[];
}

export interface NotesSectionData {
  id: string;
  notesName: string;
  notesBody: string;
}
