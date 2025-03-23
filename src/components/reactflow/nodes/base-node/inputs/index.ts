import FileInput from "./file";
import TextInput from "./text";
import NumberInput from "./number";

export const InputSwitch: { [key: string]: React.ElementType } = {
	text: TextInput,
	number: NumberInput,
	file: FileInput
};
