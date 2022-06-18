export interface Currency {
  code: string;
  currency: string;
  rates: Rate[];
}

export interface Rate {
  effectiveDate: string;
  mid: number;
  no: string;
}

export interface CurrencySearchRequest {
  code: string;
  dateFrom: Date;
}

export interface CurrencyTable {
  table: string;
  no: string;
  effectiveDate: string;
  rates: Rate[];
}
