import { AwsCredentialForm } from "@/app/(protected)/credentials/_components/credentials-form/aws";
import { SlackCredentialForm } from "@/app/(protected)/credentials/_components/credentials-form/slack";
import { UseFormReturn } from "react-hook-form";
import { FaAws, FaSlack } from "react-icons/fa6";

export enum CredentialType {
	AWS = "AWS",
	SLACK = "Slack",
}

export interface CredentialResponse {
	id: string;
	credentialType: string;
	credentialsValue: any;
	createdAt: string;
	updatedAt: string;
	profileId: string;
	user?: {
		firstName: string;
		lastName: string;
		email: string;
	};
	actions?: any;
}

// Define types for the credential request and response
export interface CreateCredentialRequest {
	credentialType: string;
	credentialsValue: any; // Using any since it's Json type in Prisma
}

// Define field type
export type CredentialField = {
	name: string;
	label: string;
	type: string;
	defaultValue?: string;
};

// Define credential types configuration
export type CredentialTypesConfig = {
	[key: string]: {
		fields: CredentialField[];
		bgColor?: string; // Optional background color for UI
		form?: React.ElementType;
		defaultIcon?: React.ElementType; // Optional default icon for UI
	};
};

export interface CredentialFormProps {
	form: UseFormReturn<any>;
	fields: CredentialField[];
	isSubmitting?: boolean;
	defaultValues?: Record<string, any>;
}

export const CREDENTIAL_TYPES: CredentialTypesConfig = {
	[CredentialType.AWS]: {
		fields: [
			{ name: "accessKeyId", label: "Access Key ID", type: "text" },
			{
				name: "secretAccessKey",
				label: "Secret Access Key",
				type: "password",
			},
			{
				name: "region",
				label: "Region",
				type: "text",
				defaultValue: "us-east-1",
			},
			{
				name: "sessionToken",
				label: "Session Token (optional)",
				type: "text",
			},
		],
		bgColor: "bg-orange-100",
		form: AwsCredentialForm,
		defaultIcon: FaAws,
	},
	[CredentialType.SLACK]: {
		fields: [
			{ name: "token", label: "Bot User OAuth Token", type: "password" },
			{
				name: "signingSecret",
				label: "Signing Secret",
				type: "password",
			},
		],
		bgColor: "bg-yellow-100",
		form: SlackCredentialForm,
		defaultIcon: FaSlack,
	},
};
