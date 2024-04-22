"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from 'next/navigation'

const BackButton = () => {
    const router = usePathname()
    const isLogin = router === "/auth/login"

    return (
        <Button
            variant="link"
            size="sm"
            className="font-normal w-full"
            asChild
        >
            <Link href={isLogin ? '/auth/register' : '/auth/login'}>
                {isLogin ? "Нет аккаунта?" : "Уже зарегестрированы?"}
            </Link>
        </Button>
    )
}

export default BackButton