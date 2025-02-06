import { useActionState, useState } from "react";
import { useFormState } from "react-dom";
import uploadFile from "./actions";
import SubmitButton from "./submitButton";
import { FaCloudUploadAlt } from "react-icons/fa";
import Image from "next/image";

const initialState = { status: "", message: "", url: "" };

const UploadForm = () => {
    const [state, formAction] = useActionState(uploadFile, initialState);
    const [preview, setPreview] = useState<string | null>(null);
    const [imageName, setImageName] = useState<string>("");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;
        const file = files[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
            setImageName(file.name)
        }
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImageName(event.target.value);
    };

    return (
        <div>
            <div className="w-96 h-96 ring-1 flex items-center justify-center">
                {preview ? (
                    <img src={preview} alt="Uploaded Preview" className="w-full h-full object-cover" />
                ) : (
                    <p className="text-gray-500">No image uploaded</p>
                )}
            </div>
            <form action={formAction}>
                <label htmlFor="file" className="cursor-pointer flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md">
                    <FaCloudUploadAlt size={24} /> Upload Image
                </label>
                <input type="file" id="file" name="file" accept="image/*" onChange={handleFileChange} className="hidden" />

                <div className="mt-4">
                    <label htmlFor="imageName" className="block text-sm font-medium text-gray-700">
                        Image Name
                    </label>
                    <input
                        type="text"
                        id="imageName"
                        name="imageName"
                        value={imageName}
                        onChange={handleNameChange}
                        className="mt-1 p-2 border rounded-md w-full"
                        placeholder="Enter custom name for the image"
                    />
                </div>
                <SubmitButton />
            </form>
            {state?.status && (
                <div>
                    <div>{state?.message}</div>
                    {state?.url && (
                        <div className="h-96 w-96 overflow-hidden object-cover">
                            <Image src={state?.url} alt="Uploaded Image" width={100} height={100} objectFit="cover" />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UploadForm;
