'use client'

import { useFormStatus } from "react-dom"

const SubmitButton = () => {
    const { pending } = useFormStatus()

    return (
        <button type='submit' aria-disabled={pending} className="bg-green-700 text-white px-6 py-2 rounded">
            {pending ? 'Image Uploading...' : 'Upload Image'}
        </button>
    )
}

export default SubmitButton