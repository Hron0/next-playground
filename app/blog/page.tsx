import { getAllPosts } from '@/lib/actions'
import { Metadata, NextPage } from 'next'
import Link from 'next/link';

interface Props { }

export const metadata: Metadata = {
    title: "Blog page | Next App"
}

export const revalidate = 10

const Page: NextPage<Props> = async ({ }) => {
    const posts = await getAllPosts()
    
    return (
        <div className='flex flex-col items-start pl-8 pt-4'>
            <h1 className="text-black text-xl">BLog page</h1>
            <ul>
            {posts.map((post: any) => (
                <li key={post.id} className='border-b-2 border-blue-900 py-2'>
                    <Link href={`/blog/${post.id}`} className="text-red-800 text-lg">
                        {post.title}
                    </Link>
                </li>
            ))}
            </ul>
        </div>
    )
}

export default Page