export interface WatsonAssistantChatOptions {
  integrationID: string;
  region: string;
  serviceInstanceID: string;
  subscriptionID?: string;
  element?: HTMLElement | null;
  onLoad?: (instance: any) => void;
  clientVersion?: string;
  showLauncher?: boolean;
  [key: string]: any;
}

export interface WxOConfiguration {
  orchestrationID: string;
  hostURL: string;
  rootElementID: string;
  chatOptions: {
    agentId: string;
    agentEnvironmentId: string;
    [key: string]: any;
  };
  [key: string]: any;
}

declare global {
  interface Window {
    watsonAssistantChatOptions?: WatsonAssistantChatOptions;
    wxOConfiguration?: WxOConfiguration;
    wxoLoader?: {
      init: () => void;
    };
  }
}