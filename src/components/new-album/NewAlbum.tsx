"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { ChangeEvent, useState } from "react";
import { toast, useToast } from "../ui/use-toast";


const NewAlbum = () => {
    const { toast } = useToast()
    const [albumName, setAlbumName] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let albumname = e.target.value
        setAlbumName(albumname)
    }
    const handleClick = async () => {
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
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <span className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 h-10 px-4 py-2"> Create Album </span>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Name your Album</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>
                    <Input value={albumName} onChange={handleChange} />
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClick}>Create</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default NewAlbum