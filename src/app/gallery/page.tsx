
import { Sidebar } from "@/components"
import HomeImages from "@/components/homeImages/HomeImages"

const Gallery = () => {
    return (
        <section className="flex justify-between min-h-screen">
            <Sidebar />
            <section className="flex flex-col w-[80%] px-8 relative left-[20%] z-0">
                <h1 className="font-bold text-2xl pl-3 pt-9">Gallery</h1>
                <HomeImages />
            </section>
        </section>
    )
}

export default Gallery