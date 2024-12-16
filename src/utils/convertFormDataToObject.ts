export type FormDataObject = Record<string, FormDataEntryValue>;

export default function convertFormDataToObject(data: FormData) {
	const formDataObj: FormDataObject = {};
	data.forEach((value, key) => (formDataObj[key] = value));

	return formDataObj;
}
