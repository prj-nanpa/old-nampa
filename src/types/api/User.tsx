import { Event } from "../../types/api/Event";
import { Tag } from "../../types/api/Tag";

export type User = {
  user_id?: string;
  user_email?: string;
  user_name?: string;
  user_nickname?: string;
  user_icon?: string;
  user_coe?: string;
  user_sl?: string;
  user_comment?: string;
  user_tags?: Tag[];
  user_lineqr?: string;
  user_twitterid?: string;
  user_instagramid?: string;
  user_facebookid?: string;
  host_event?: Event[];
  join_event?: Event[];
  past_event?: Event[];
  all_tag?: Tag[];
  user_tags_id?: Array<number>;
};
