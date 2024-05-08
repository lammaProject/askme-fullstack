export interface Chat {
  username: string;
  chatAll: string;
  usernameSend: string;
  text: {}[];
}

export type GetChat = {
  chat: Chat;
};
