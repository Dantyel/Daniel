export interface UnitData {
  id: number;
  localidade: string;
  opm_raio: string;
  btl_raio: string;
}

export type FilterType = 'ALL' | '1ºBPRAIO' | '2ºBPRAIO' | '3ºBPRAIO' | '4ºBPRAIO' | '5ºBPRAIO';