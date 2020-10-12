import { KeyValueModel, Product } from "./product.model";

export class SubProduct {
  _id: string;
  name: string;
  description: string;
  product: Product = new Product();
  detail: SubProductDetail = new SubProductDetail();
  build_specs: KeyValueModel[] = [];
  constructor() {
    const specs = BuildSpecs;
    specs.forEach((spec) => {
      const build_spec = new KeyValueModel(spec);
      this.build_specs.push(build_spec);
    });
  }
}

export class SubProductDetail {
  media: any;
  icon: any;
  name: string;
}

const BuildSpecs = [
  "Price",
  "Weight",
  "Wheel Size",
  "Fork",
  "Shock",
  "Rear Derailleur",
  "Shifters",
  "Crankset",
  "Cassette",
  "Chain",
  "Bottom Bracket",
  "Brakes",
  "Brake Rotors",
  "Headset",
  "Bars",
  "Stem",
  "Grips",
  "Front Hub",
  "Rear Hub",
  "Rims",
  "Chainguide",
  "Spokes",
  "Front Tire",
  "Rear Tire",
  "Tubes",
  "Seat Post",
  "Saddle",
];
