/** Hotel parceiro da HoGrow */
export interface Hotel {
  name: string;
  city: string;
}

/** Estado brasileiro com hoteis HoGrow */
export interface BrazilState {
  id: string;
  name: string;
  hotels: Hotel[];
}

/** Agencia parceira */
export interface Agency {
  id: string;
  name: string;
}
