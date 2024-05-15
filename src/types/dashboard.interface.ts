export interface Chat {
  username: string;
  chatAll: string;
  usernameSend: string;
  text: {}[];
}

export type GetChat = {
  chat: Chat;
};

export interface User {
  id: string;
  name: string;
  photo?: string;
  role: string;
  verified: boolean;
  email: string;
}
