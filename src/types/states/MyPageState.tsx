import { Tag } from "../api/Tag";
import { User } from "../api/User";
export type MyPageState = {
  user: User;
  all_tag: Array<Tag>;
};
