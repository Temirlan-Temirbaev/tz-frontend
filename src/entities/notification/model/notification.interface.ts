import {Document} from "../../document"
export interface Notification {
  notification_id: number;
  is_read: boolean,
  created_at: string,
  document: Document
}