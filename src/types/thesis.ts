export interface ThesisSection {
  id: string;
  title: string;
  placeholder: string;
  content: string;
}

export interface Thesis {
  id: string;
  title: string;
  sections: ThesisSection[];
  updatedAt: string;
}
