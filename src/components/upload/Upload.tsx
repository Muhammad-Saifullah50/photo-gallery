'use client'
import { Input } from '../ui/input'
import { AiOutlineUpload } from 'react-icons/ai'
import { ChangeEvent, useState } from 'react'
import { useToast } from "@/components/ui/use-toast"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button'


const Upload = ({ albums }: any) => {

    const { toast } = useToast()
    const [selectedAlbum, setSelectedAlbum] = useState("")
    console.log(selectedAlbum)
    const [imageUrl, setImageUrl] = useState<string>('')
    // console.log(imageUrl)
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
            const newData = {
                image: imageUrl,
                albumId: selectedAlbum === '' ? albums[0].id : selectedAlbum
            }
            // console.log(newData)
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: JSON.stringify(newData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            // console.log(data.message)
            toast({
                title: data.message === 'Image uploaded successfully' ? "Success" : "Upload Failed",
                description: data.message,

            })
        } catch (error) {
            console.error(error)
        }
    }
    const handleAlbumChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedAlbum(e.target.value)
    }
    return (<>
        <div className="flex gap-5 justify-between my-4 w-full px-6" id='top'>
            <Input
                className="w-full"
                type='file'
                accept="image/*"
                onChange={handleImageChange}
            />

            <Dialog>
                <DialogTrigger>
                    <span className='gap-3 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 h-10 px-4 py-2' >
                        <AiOutlineUpload size='25' />Upload</span>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Choose an album for your image
                        </DialogTitle>
                        <DialogDescription>
                            <select name="album" id="album" value={selectedAlbum === '' ? albums[0].id : selectedAlbum} onChange={handleAlbumChange}>
                                {albums?.map((item: any) => (
                                    <option
                                        className='text-base font-medium my-2'
                                        key={item.name}
                                        value={item.id}
                                    >{item.name}</option>))}
                            </select>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={handleClick}>Continue</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div >

    </>)
}

export default Upload
