export type AlertType = "success" | "error" | "warning" | "info";

export interface AlertData {
  id: number;
  message: string;
  severity: AlertType;
}

export interface AlertContextValue {
  showAlert: (message: string, severity?: AlertType) => void;
}