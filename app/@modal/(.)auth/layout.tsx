export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden my-8">
            {children}
        </div>
    )
}