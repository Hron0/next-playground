import { auth, signOut } from "@/auth"

const SettingsPage = async () => {
    const session = await auth()

    return (
        <div className="flex flex-col items-start">
            {JSON.stringify(session)}
            <form action={async () => {
                "use server"
                await signOut()
            }}>
                <button>SignOut</button>
            </form>

        </div>
    )
}

export default SettingsPage