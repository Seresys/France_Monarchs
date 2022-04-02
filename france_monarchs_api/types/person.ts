type DateFormat = "yyyy" | "mm-yyyy" | "dd-mm-yyyy";
type HistoricDate = {
  date: Date;
  precise: boolean;
  format: DateFormat;
};
type Human = {
  id: string;
  label: string;
  abstract?: string;
  birthDate?: HistoricDate;
  birthPlace?: string;
  deathDate?: HistoricDate;
  deathPlace?: string;
  burialPlace?: string;
  parent?: string[];
  child?: string[];
  spouse?: string[];
  successor?: string[];
};
export type King = Human & {
  house?: string;
  title?: string;
  activeYearsStartYear?: number;
  activeYearsEndYear?: number;
};

export type Person = Human | King;
