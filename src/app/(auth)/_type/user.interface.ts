export interface User {
  name: string;
  password: string;
  email?: string;
  status?: "online" | "offline";
}
