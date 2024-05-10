export type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

export type User = {
  id?: number;
  userName: string;
  userPower: 1 | 2 | 3 | 4 | 5 // 1 = SuperAdmin 2 = Medic, 3 = Supraveghetor, 4 = Ingrijitor, 5 = Pacient
};