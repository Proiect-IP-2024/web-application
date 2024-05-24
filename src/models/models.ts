export type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface User {
  id?: string;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  newPassword?: string;
  userPower: 1 | 2 | 3 | 4 | 5; // 1 = Admin, 2 = Medic, 3 = Supraveghetor, 4 = Ingrijitor, 5 = Pacient
}

export interface HomeNavigation {
  currentPage: "Patient List" | "Add Patient" | "Patient" | "Admin" | undefined;
}

export interface Pacient extends Omit<User, "password" | "newPassword"> {
  id?: string;
  id_medic?: string;
  profile_picture?: string;
  CNP_pacient: string;
  varsta_pacient: number;
  adresa_pacient: string;
  telefon_pacient: string;
  profesie_pacient: string;
  loc_munca_pacient: string;
}

export interface Medic extends Omit<User, "password" | "newPassword"> {
  telefon: string;
}
