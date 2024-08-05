export interface LoginProps {
  me: string;
  changeName: (value: string) => void;
  onLogin: (name: string) => void;
}
