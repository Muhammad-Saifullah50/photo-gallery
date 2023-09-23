'use client'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ImageCard } from '..';
import Link from 'next/link';
type searchResult = {
    total: number
    total_pages: number
    results: Result[]
}
type Result = {
    id: string
    slug: string
    created_at: string
    updated_at: string
    promoted_at: null | string,
    width: number,
    height: number,
    color: string,
    blur_hash: string,
    description: null | string,
    alt_description: string
    breadcrumbs: [],
    urls: {
        raw: string
        full: string,
        regular: string,
        small: string,
        thumb: string,
        small_s3: string
    },
    links: {
        self: string,
        html: string,
        download: string,
        download_location: string
    },
    likes: number,
    liked_by_user: boolean,
    current_user_collections: [],
    sponsorship: {},
    topic_submissions: {},
    tags: []
    user: {}

}
const HomeImages = () => {
    const [searchValue, setSearchValue] = useState("Wallpapers")
    const [searchResults, setSearchResults] = useState<searchResult | null>(null);
    const [currPage, setCurrPage] = useState(1)


    const unsplashRoot = 'https://api.unsplash.com'
    const clientId = process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID
    useEffect(() => {
        sessionStorage.setItem('effectHasRun', 'false')
    }, [])


    useEffect(() => {
        const effectStatus = sessionStorage.getItem('effectHasRun')
        if (effectStatus !== 'true') {
            const makeFirstRequest = async () => {
                const response = await fetch(`${unsplashRoot}/search/photos?query=${searchValue}&client_id=${clientId}&per_page=30`)

                const data = await response.json();
                console.log(data)
                setSearchResults(data)
                sessionStorage.setItem('effectHasRun', 'true')
                return data
            }
            makeFirstRequest();

        }

    }, [])


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let searchingValue = e.target.value
        setSearchValue(searchingValue)
    }
    const handleClick = async () => {
        try {

            const response = await fetch(`${unsplashRoot}/search/photos?query=${searchValue}&client_id=${clientId}&per_page=30`)

            const data = await response.json();
            console.log(data)
            setSearchResults(data)
            return data
        } catch (error) {
            console.error(error)
        }

    }

    const handleNextPage = async () => {
        try {
            const nextPage = currPage + 1
            setCurrPage(nextPage)
            const response = await fetch(`${unsplashRoot}/search/photos?query=${searchValue}&client_id=${clientId}&per_page=30&page=${currPage}`)

            const data = await response.json();
            setSearchResults(data)
            return data
        } catch (error) {
            console.log(error)
        }
    }

    const handlePrevPage = async () => {
        try {
            const prevPage = currPage - 1
            setCurrPage(prevPage)
            const response = await fetch(`${unsplashRoot}/search/photos?query=${searchValue}&client_id=${clientId}&per_page=30&page=${currPage}`)

            const data = await response.json();
            setSearchResults(data)
            return data
        } catch (error) {
            console.log(error)
        }
    }

    return (<>
        <div className="flex gap-5 justify-between my-4 w-full px-6" id='top'>
            <Input value={searchValue} onChange={handleChange} className="w-full" />
            <Button type='button' onClick={handleClick}>Search</Button>
        </div>
        <div className="columns-1 sm:columns-2 md:columns-3 xl:columns-4 gap-4 mx-auto p-5 space-y-5">
            {searchResults?.results?.map((result: Result) => (
                <ImageCard
                    key={result.id}
                    src={result.urls.regular}
                    width={result.width}
                    height={result.height}
                    alt={result.alt_description}

                />

            ))}
        </div >
        {searchResults &&
            <div className='flex justify-between w-full  p-5 py-5'>

                {currPage !== 1 ? <Link href='#top'><Button onClick={handlePrevPage} className='w-full'>Previous Page</Button></Link> : null}

                <Link href='#top'> <Button onClick={handleNextPage} className='w-full'>Next Page</Button></Link>



            </div>
        }

    </>)
}

export default HomeImages