export class Product {
  _id: string;
  name: string;
  title: string;
  description: string = "Please write product description here!!";
  features: KeyValueModel[] = [];
  slug: string;
  close_up_media: any[] = [];
  long_shot_media: any[] = [];
  media_urls: any[] = [];
  geometry: Geometry[] = [];
  tech_support: TechSupport = new TechSupport();
  is_deleted: boolean;
  constructor() {
    const geoName = ["27.5", "29", "MX"];
    geoName.forEach((item) => {
      const geo = new Geometry(item);
      this.geometry.push(geo);
    });
  }
}

export class TechSupport {
  faqs: KeyValueModel[] = [];
  components: KeyValueModel[] = [];
  warranty_and_registration: string;
}

export class KeyValueModel {
  key: string;
  value: string;
  constructor(key?) {
    if (key) {
      this.key = key;
    }
  }
}

export class Geometry {
  key: string;
  high: SizeModel[] = [];
  low: SizeModel[] = [];
  frame_size: FrameSize[] = [];

  constructor(key) {
    this.key = key;
    const highValues = GeometryKeyName;
    const frames = ["small", "medium", "large"];
    highValues.forEach((item) => {
      const size = new SizeModel(item);
      this.high.push(size);
      this.low.push(size);
    });

    frames.forEach((frame) => {
      const item = new FrameSize(frame);
      this.frame_size.push(item);
    });
  }

  // constructor(key) {
  //   this.key = key;
  // }
}

export class SizeModel {
  key: string;
  order: string;
  small: number;
  medium: number;
  large: number;
  constructor(object) {
    this.key = object.key;
    this.order = object.order;
  }
}

export class FrameSize {
  key: string;
  from: number;
  to: number;
  constructor(key) {
    this.key = key;
  }
}

const GeometryKeyName = [
  { key: "Reach", order: "A" },
  { key: "Stack", order: "B" },
  { key: "Head Tube Angle", order: "C" },
  { key: "Seat Tube Length", order: "D" },
  { key: "Front Center", order: "E" },
  { key: "BB Height", order: "F" },
  { key: "BB Drop", order: "G" },
  { key: "Wheelbase", order: "H" },
  { key: "Rear Center", order: "I" },
  { key: "Head Tube Length", order: "J" },
  { key: "Top Tube Length", order: "K" },
  { key: "Seat Tube Angle", order: "L" },
  { key: "Standover Height", order: "M" },
  { key: "Eye to Eye Length", order: "N" },
];
