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


const NewAlbum = () => {
    const [albumName, setAlbumName] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let albumname = e.target.value
        setAlbumName(albumname)
    }
    const handleClick = async () => {
        let request = await fetch('/api/newalbum', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                albumname: albumName,
            })
        })
        let data = await request.json()
        console.log(data)
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button>Create Album</Button>
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