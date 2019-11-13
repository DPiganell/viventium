import { Tag } from './../tags/tag';
export class Comment {
  id: number;
  title: string;
  text: string;
  tags: Tag[];

  edit?: boolean;
  copy?: Comment;
  newtag?: string;
}
