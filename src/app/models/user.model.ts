export class User {
  _id: string;
  name: string;
  email: string;
  work_email: string;
  mobile: string;
  active: boolean;
  pan_number: string;
  work_type: string;
  max_eligibility: string;
  has_terms_accepted: boolean;
  ctc: number;
  favorites: [];
  documents: Document[] = [];
}
