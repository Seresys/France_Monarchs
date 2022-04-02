type DateFormat = "yyyy" | "mm-yyyy" | "dd-mm-yyyy";
type HistoricDate = {
  date: Date;
  precise: boolean;
  format: DateFormat;
};

export type Person = {
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
  house?: string;
  title?: string;
  activeYearsStartYear?: number;
  activeYearsEndYear?: number;
};

