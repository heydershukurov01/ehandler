export interface Config {
  message: {
    unAuthenticated: string;
    statusException: string;
    serverException: string;
    appException: string;
  };
  logout: string;
  logoutCodes: number[];
  hook: string;
}
