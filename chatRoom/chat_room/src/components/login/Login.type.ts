export interface LoginProps {
  me: string;
  changeName: (value: string) => {};
  onLogin: (name: string) => {};
}
