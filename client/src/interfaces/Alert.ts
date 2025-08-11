export type AlertType = "success" | "error" | "warning" | "info";

export interface AlertData {
  message: string;
  severity: AlertType;
}

export interface AlertContextValue {
  showAlert: (message: string, severity?: AlertType) => void;
}