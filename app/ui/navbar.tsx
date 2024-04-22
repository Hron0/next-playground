import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function Navbar() {
    return (
        <div className="w-full py-2 px-6 flex flex-row items-center justify-between bg-black">
            <div className='flex flex-row items-center gap-4'>
                <Label className='text-white'>
                    <Link href={"/"}>Home</Link>
                </Label>
                <Label className='text-white'>
                    <Link href={"/blog"}>Blog Page</Link>
                </Label>
            </div>

            <div className='flex flex-row items-center gap-6'>
                <Label className='text-white'>
                    <Link href={"/auth/login"}>Login</Link>
                </Label>
                <Label className='text-white'>
                    <Link href={"/auth/register"}>Register</Link>
                </Label>
            </div>
        </div>
    )
}