export type Post = {
  id: string;
  image_url: string;
  title: string;
  publish_date: Date;
  body: string;
  verse?: string;
  book?: string;
  deleted_at?: Date;
};

export type NewPost = { image: File } & Omit<
  Post,
  'id' | 'image_url' | 'deleted_at'
>;
