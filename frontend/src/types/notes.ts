export type Note = {
  id: 1;
  title: string;
  slug: string;
  content: string;
  pinned: boolean;
  pinned_at: null | string;
  created_at: string;
  updated_at: string;
};

export type GetNotesResponse = {
  count: number;
  next: null | number;
  previous: null | number;
  results: Note[];
};
