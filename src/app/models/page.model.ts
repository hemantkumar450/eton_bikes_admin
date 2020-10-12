export class PageModel {
  _id: string;
  name: string;
  heading: string;
  content: string = "Write your content here!!";
  sections: Section[] = [];
  pageType: string;
  is_deleted: boolean;
}

export class Section {
  name: string;
  heading: string;
  order: number;
  media_side: string;
  redirect_detail: RedirectDetail[] = [];
  content: string = "Write your content here!!";
  medias: any[] = [];
  sectionType: string;
}

export class RedirectDetail {
  button_text: string;
  redirect_url: string;
}
