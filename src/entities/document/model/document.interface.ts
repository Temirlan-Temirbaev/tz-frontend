export interface Document {
  document_id: number;
  document_name: string;
  document_url: string;
  status: "pending" | "accepted" | "denied";
  created_at : string;
  accepted_at : string | null;
}