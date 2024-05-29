export type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  newPassword?: string;
  userPower: 1 | 2 | 3 | 4 | 5; // 1 = Admin, 2 = Medic, 3 = Supraveghetor, 4 = Ingrijitor, 5 = Pacient
}

export interface HomeNavigation {
  currentPage:
    | "Patient List"
    | "Add Patient"
    | "Patient"
    | "Admin"
    | "View Patient"
    | "Profile"
    | undefined;
}

export interface Pacient extends Omit<User, "password" | "newPassword"> {
  id_medic?: string;
  profile_picture?: string;
  CNP_pacient: string;
  varsta_pacient: number;
  adresa_pacient: string;
  telefon_pacient: string;
  profesie_pacient: string;
  loc_munca_pacient: string;
}

export interface Consult {
  consultatii_cardiologice: string;
  id_consult: string;
  data_consult: string;
  glicemie: string;
  tensiune: number;
}

export interface Diagnostic {
  id_diagnostic: string;
  diagnostic: string;
  data_emiterii: string;
  alte_detalii: string;
}

export interface Tratament {
  id_tratament: string;
  tratament: string;
  bifat_supraveghetor: number;
  data_ora_bifare: Date;
  observatii_ingrijitor: string;
}

export interface Medicament {
  id_medicament: string;
  nume_medicament: string;
  frecventa: string;
}

export interface Recomandare {
  id_recomandare?: number;
  CNP_pacient: string;
  tip_recomandare: string;
  durata_zilnica?: number;
  alte_indicatii?: string;
  tratamente?: string;
}

export interface AlertaAutomata {
  id_alerta_automata: number;
  tip_senzor: string;
  mesaj_automat: string;
  data_alerta_automata: Date;
}

export interface SensorData {
  ID_senzor: number;
  valoare_puls: number;
  validitate_puls: number;
  valoare_temp: number;
  validitate_temp: number;
  valoare_umiditate: number;
  validitate_umiditate: number;
  valoare_lumina: number;
  validitate_lumina: number;
  timestamp: Date;
}

export interface AllPacientData extends Pacient {
  ID_date_medicale: string;
  alergii: string;
  greutate: number;
  consult?: Consult;
  diagnostic?: Diagnostic[];
  tratament?: Tratament[];
  medicament?: Medicament[];
  recomandare?: Recomandare[];
  alerta_automata?: AlertaAutomata[];
  sensor_data?: SensorData[];
}

export interface Medic extends Omit<User, "password" | "newPassword"> {
  telefon: string;
}

export interface Alarms {
  puls_max: number;
  puls_min: number;
  temperatura_max: number;
  temperatura_min: number;
  umiditate_max: number;
  umiditate_min: number;
}
