'use client'
import React, { ChangeEvent, useState } from 'react'
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ImageCard } from '..';
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
    const [searchValue, setSearchValue] = useState("design")
    const [searchResults, setSearchResults] = useState<searchResult | null>(null
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let searchingValue = e.target.value
        setSearchValue(searchingValue)
    }
    const handleClick = async () => {
        try {
            const unsplashRoot = 'https://api.unsplash.com'
            const clientId = process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID

            const response = await fetch(`${unsplashRoot}/search/photos?query=${searchValue}&client_id=${clientId}&per_page=30`)

            const data = await response.json();
            console.log(data)
            setSearchResults(data)
            return data
        } catch (error) {
            console.error(error)
        }

    }
    return (<>
        <div className="flex gap-5 justify-between my-4 w-full px-6">
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
        <div className='w-32 flex justify-center mx-auto py-5'>
            <Button className='w-full'>Load More</Button>
        </div>
    </>)
}

export default HomeImages