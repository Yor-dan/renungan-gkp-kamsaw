export type Post = {
  id: string;
  image_url: string;
  title: string;
  publish_date: string;
  body: string;
  verse?: string;
  book?: string;
  deleted_at?: string;
};

export type NewPost = { image: File } & Omit<
  Post,
  'id' | 'image_url' | 'deleted_at'
>;
