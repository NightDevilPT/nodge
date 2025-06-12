// components/credentials/slack-credential-form.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CredentialFormProps } from "@/interface/credential.interface";

export function SlackCredentialForm({
	form,
	fields,
	isSubmitting,
}: CredentialFormProps) {
	const {
		register,
		formState: { errors },
	} = form;

	return (
		<div className="space-y-4">
			{fields.map((field) => (
				<div key={field.name} className="space-y-2">
					<Label htmlFor={field.name}>
						{field.label}
						{field.type === "password" && (
							<span className="ml-1 text-xs text-green-600">
								🔒
							</span>
						)}
					</Label>
					<Input
						id={field.name}
						type={field.type}
						{...register(`credentialsValue.${field.name}`)}
						placeholder={`Enter ${field.label.toLowerCase()}`}
						disabled={isSubmitting}
					/>
				</div>
			))}
		</div>
	);
}
