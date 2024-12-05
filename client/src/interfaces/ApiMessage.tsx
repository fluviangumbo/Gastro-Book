export interface ApiMessage {
  status: string; // 'success' or 'error' or 'info'
  message: string;
  data?: any; // optional data
}
