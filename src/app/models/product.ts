export class Product {
  _id: string;
  name: string;
  title: string;
  description: string;
  features: KeyValueModel[] = [];
  slug: string;
  close_up_media: any[] = [];
  long_shot_media: any[] = [];
  media_urls: any[] = [];
  geometry: Geometry[];
  tech_support: TechSupport = new TechSupport();
  is_deleted: boolean;
}

export class TechSupport {
  faqs: KeyValueModel[] = [];
  components: KeyValueModel[] = [];
  warranty_and_registration: string;
}

export class KeyValueModel {
  key: string;
  value: string;
}

export class Geometry {
  key: string;
  high: SizeModel[] = [];
  low: SizeModel[] = [];
  frame_size: FrameSize[] = [];
}

export class SizeModel {
  key: string;
  small: number;
  medium: number;
  large: number;
}

export class FrameSize {
  key: string;
  from: number;
  to: number;
}
