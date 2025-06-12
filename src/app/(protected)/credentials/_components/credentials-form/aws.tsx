import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CredentialFormProps } from "@/interface/credential.interface";

export function AwsCredentialForm({
	form,
	fields,
	isSubmitting,
}: CredentialFormProps) {
	const { register, formState: { errors } } = form;

	return (
		<div className="space-y-4">
			{fields.map((field) => (
				<div key={field.name} className="space-y-2">
					<Label htmlFor={field.name}>{field.label}</Label>
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
