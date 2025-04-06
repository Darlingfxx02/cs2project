interface TelegramWebApp {
  ready(): void;
  expand(): void;
  close(): void;
  colorScheme: 'light' | 'dark';
  
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isActive: boolean;
    isProgressVisible: boolean;
    setText(text: string): void;
    onClick(callback: () => void): void;
    offClick(callback: () => void): void;
    show(): void;
    hide(): void;
    enable(): void;
    disable(): void;
    showProgress(leaveActive: boolean): void;
    hideProgress(): void;
  };
  
  BackButton: {
    isVisible: boolean;
    onClick(callback: () => void): void;
    show(): void;
    hide(): void;
  };
  
  initData: string;
  initDataUnsafe: {
    query_id: string;
    user?: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      language_code?: string;
    };
    auth_date: number;
    hash: string;
  };
}

interface Window {
  Telegram: {
    WebApp: TelegramWebApp;
  };
} 