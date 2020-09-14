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
  is_verified: ProfileStatus = new ProfileStatus();
}

export class Document {
  _id: string;
  doc_type: string;
  file: string;
}

export class ProfileStatus {
  kyc: boolean;
  mobile: boolean;
  experion: boolean;
  email: boolean;
  bank_statement: boolean;
  token_amount: boolean;
  security_amount: boolean;
  all_document: boolean;
  contact_support: boolean;
}

export class UploadDocument {
  pan: boolean = false;
  // adhar: boolean = false;
  driving_licence: boolean = false;
  bank_statement: boolean = false;
  form_16: boolean = false;
  salary_slip: false = false;
  itr: false = false;
}

export class PaymentDetail {
  amount: number;
  order_id: string;
  payment_mode: string;
  payment_type: string;
  reference_id: string;
  transaction_message: string;
  transaction_status: string;
  transaction_time: string;
}

export class DownloadFile {
  experion: FileDetails = new FileDetails();
  inkredo: FileDetails = new FileDetails();
}

export class FileDetails {
  report: any;
  reportName: string;
}
