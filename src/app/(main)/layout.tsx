import { Sidebar } from "@/components"

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <section className="flex justify-between min-h-screen">
            <Sidebar />
            <section className="flex flex-col w-[80%] px-8 relative left-[20%] z-0">
                {children}
            </section>
        </section>
    )
}

export default MainLayout