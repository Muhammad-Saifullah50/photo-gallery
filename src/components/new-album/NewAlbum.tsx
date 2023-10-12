"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { ChangeEvent, useState } from "react";
import { toast, useToast } from "../ui/use-toast";
import { TailSpin } from 'react-loader-spinner'
import { X } from "lucide-react";
import { useTheme } from "next-themes";



const NewAlbum = () => {
    const { toast } = useToast()
    const [albumName, setAlbumName] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [open, setOpen] = useState(false)
    const { theme } = useTheme()
    // console.log(theme)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let albumname = e.target.value
        setAlbumName(albumname)
    }
    const handleClick = async () => {
        try {
            setSubmitting(true)
            let request = await fetch('/api/newalbum', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    albumname: albumName,
                })
            })
            let data = await request.json()
            setAlbumName('')
            // console.log(data)

            toast({
                variant: data.message === 'Album added successfully' ? "default" : "destructive",
                title: data.message === 'Album added successfully' ? "Success" : "Upload Failed",
                description: data.message,
            })
            if (data.message === 'Album added successfully') 
            { alert('Please refresh the page to seee the new album, active development is going on this bug') }
        } catch (error) {
            console.error(error)
        }
        finally {
            setSubmitting(false)
            setOpen(false)
        }

    }

    return (
        <Dialog open={open} onOpenChange={() => setOpen(true)}>
            <DialogTrigger>
                <span className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 h-10 px-4 py-2"> Create Album </span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <X className="h-4 w-4 absolute right-8 top-4" onClick={() => setOpen(false)}></X>
                    <DialogTitle>Name your Album</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <Input value={albumName} onChange={handleChange} />
                </DialogDescription>
                <DialogFooter>
                    <Button onClick={handleClick}>{submitting ? 'Creating' : "Create"}
                        {submitting ? <span className='ml-2'>
                            <TailSpin
                                height="25"
                                width="25"
                                color={`${theme === 'dark' ? '#000000' : '#FFFFFF'}`}
                                ariaLabel="tail-spin-loading"
                                radius="1"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            /></span> : null}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default NewAlbum