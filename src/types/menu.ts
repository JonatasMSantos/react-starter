import { User } from "./user";

export type HeaderItems = {
  title: string;
  user?: User;
  onLogin: () => void;
  onLogout: () => void;
};
