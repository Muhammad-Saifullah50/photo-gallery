'use client'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { AiOutlineUpload } from 'react-icons/ai'
import { ChangeEvent, useState } from 'react'

const Upload = () => {
    const [imageUrl, setImageUrl] = useState<string>('')
    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const file = e.target.files?.[0]
        if (!file) return
        if (!file.type.includes('image')) {
            return alert('Please upload an image file')
        }

        try {
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = async () => {
                const result = reader.result as string
                setImageUrl(result)

            }

        } catch (error) {
            console.error(error)
        }


    }

    const handleClick = async () => {
        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: imageUrl,
                headers: {
                    'Content-Type': 'text/plain'
                }
            })
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }

    return (<>
        <div className="flex gap-5 justify-between my-4 w-full px-6" id='top'>
            <Input
                className="w-full"
                type='file'
                accept="image/*"
                onChange={handleImageChange}
            />
            <Button type='button' className='gap-3' onClick={handleClick}>
                <AiOutlineUpload size='25' />Upload</Button>
        </div>

    </>)
}

export default Upload
