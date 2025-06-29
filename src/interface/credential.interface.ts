import { CredentialInputForm } from "@/app/(protected)/credentials/_components/credentials-form/credentials-input-form";
import { UseFormReturn } from "react-hook-form";
import { 
  FaAws, 
  FaSlack, 
  FaGoogle,
  FaMicrosoft,
  FaGithub,
  FaDatabase,
  FaStripe,
  FaSalesforce
} from "react-icons/fa6";
import { SiZapier, SiTwilio, SiMongodb, SiOpenai } from "react-icons/si";

export enum CredentialType {
  // Cloud Providers
  AWS = "AWS",
  AZURE = "Azure",
  GOOGLE_CLOUD = "Google Cloud",
  
  // AI Services
  OPENAI = "OpenAI",
  GOOGLE_AI = "Google AI",
  ANTHROPIC = "Anthropic",
  
  // Communication Platforms
  SLACK = "Slack",
  
  // Developer Tools
  GITHUB = "GitHub",
  
  // Databases
  POSTGRES = "PostgreSQL",
  MONGODB = "MongoDB",
  MYSQL = "MySQL",
  
  // Payment Processors
  STRIPE = "Stripe",
}

export interface CredentialResponse {
  id: string;
  credentialType: CredentialType;
  credentialsValue: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  profileId: string;
  user?: {
    firstName: string;
    lastName: string;
    email: string;
  };
  actions?: any;
  icon?:any;
}

export interface CreateCredentialRequest {
  credentialType: CredentialType;
  credentialsValue: Record<string, any>;
}

export type CredentialField = {
  name: string;
  label: string;
  type: string;
  defaultValue?: string;
  optional?: boolean;
};

export type CredentialTypesConfig = {
  [key in CredentialType]: {
    fields: CredentialField[];
    bgColor?: string;
    form?: React.ComponentType<any>;
    defaultIcon?: React.ComponentType<any>;
    formProps?: Record<string, any>;
  };
};

export const CREDENTIAL_TYPES: CredentialTypesConfig = {
  // Cloud Providers
  [CredentialType.AWS]: {
    fields: [
      { name: "accessKeyId", label: "Access Key ID", type: "text" },
      { name: "secretAccessKey", label: "Secret Access Key", type: "password" },
      { name: "region", label: "Region", type: "text", defaultValue: "us-east-1" },
      { name: "sessionToken", label: "Session Token", type: "text", optional: true },
    ],
    bgColor: "bg-orange-200",
    form: CredentialInputForm,
    defaultIcon: FaAws,
  },

  [CredentialType.AZURE]: {
    fields: [
      { name: "clientId", label: "Client ID", type: "text" },
      { name: "clientSecret", label: "Client Secret", type: "password" },
      { name: "tenantId", label: "Tenant ID", type: "text" },
      { name: "subscriptionId", label: "Subscription ID", type: "text", optional: true },
    ],
    bgColor: "bg-blue-100",
    form: CredentialInputForm,
    defaultIcon: FaMicrosoft,
  },

  [CredentialType.GOOGLE_CLOUD]: {
    fields: [
      { name: "projectId", label: "Project ID", type: "text" },
      { name: "privateKeyId", label: "Private Key ID", type: "text" },
      { name: "privateKey", label: "Private Key", type: "password" },
      { name: "clientEmail", label: "Client Email", type: "text" },
    ],
    bgColor: "bg-blue-100",
    form: CredentialInputForm,
    defaultIcon: FaGoogle,
  },

  // AI Services
  [CredentialType.OPENAI]: {
    fields: [
      { name: "apiKey", label: "API Key", type: "password" },
      { name: "organization", label: "Organization ID", type: "text", optional: true },
    ],
    bgColor: "bg-purple-100",
    form: CredentialInputForm,
    defaultIcon: SiOpenai,
    formProps: { showLockIcon: true },
  },

  [CredentialType.GOOGLE_AI]: {
    fields: [
      { name: "apiKey", label: "API Key", type: "password" },
      { name: "projectId", label: "Project ID", type: "text" },
    ],
    bgColor: "bg-blue-100",
    form: CredentialInputForm,
    defaultIcon: FaGoogle,
  },

  [CredentialType.ANTHROPIC]: {
    fields: [
      { name: "apiKey", label: "API Key", type: "password" },
    ],
    bgColor: "bg-green-100",
    form: CredentialInputForm,
    defaultIcon: FaGoogle,
  },

  // Communication Platforms
  [CredentialType.SLACK]: {
    fields: [
      { name: "token", label: "Bot User OAuth Token", type: "password" },
      { name: "signingSecret", label: "Signing Secret", type: "password" },
    ],
    bgColor: "bg-yellow-100",
    form: CredentialInputForm,
    defaultIcon: FaSlack,
    formProps: { showLockIcon: true },
  },

  // Developer Tools
  [CredentialType.GITHUB]: {
    fields: [
      { name: "token", label: "Personal Access Token", type: "password" },
    ],
    bgColor: "bg-gray-100",
    form: CredentialInputForm,
    defaultIcon: FaGithub,
  },

  // Databases
  [CredentialType.POSTGRES]: {
    fields: [
      { name: "host", label: "Host", type: "text" },
      { name: "port", label: "Port", type: "number", defaultValue: "5432" },
      { name: "database", label: "Database", type: "text" },
      { name: "username", label: "Username", type: "text" },
      { name: "password", label: "Password", type: "password" },
    ],
    bgColor: "bg-blue-100",
    form: CredentialInputForm,
    defaultIcon: FaDatabase,
  },

  [CredentialType.MONGODB]: {
    fields: [
      { name: "connectionString", label: "Connection String", type: "password" },
      { name: "database", label: "Database Name", type: "text" },
      { name: "username", label: "Username", type: "text", optional: true },
      { name: "password", label: "Password", type: "password", optional: true },
    ],
    bgColor: "bg-green-100",
    form: CredentialInputForm,
    defaultIcon: SiMongodb,
    formProps: { showLockIcon: true },
  },

  [CredentialType.MYSQL]: {
    fields: [
      { name: "host", label: "Host", type: "text" },
      { name: "port", label: "Port", type: "number", defaultValue: "3306" },
      { name: "database", label: "Database", type: "text" },
      { name: "username", label: "Username", type: "text" },
      { name: "password", label: "Password", type: "password" },
    ],
    bgColor: "bg-blue-100",
    form: CredentialInputForm,
    defaultIcon: FaDatabase,
  },

  // Payment Processors
  [CredentialType.STRIPE]: {
    fields: [
      { name: "apiKey", label: "Secret Key", type: "password" },
      { name: "publishableKey", label: "Publishable Key", type: "text", optional: true },
    ],
    bgColor: "bg-indigo-100",
    form: CredentialInputForm,
    defaultIcon: FaStripe,
  },
};

export interface CredentialFormProps {
  form: UseFormReturn<any>;
  fields: CredentialField[];
  isSubmitting?: boolean;
  defaultValues?: Record<string, any>;
}