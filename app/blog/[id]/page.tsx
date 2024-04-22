import { getAllPosts, getPostById } from '@/lib/actions'
import { Metadata, NextPage } from 'next'

interface Props {
    params: {
        id: string
    }
}

export async function generateStaticParams() {
    const posts: any[] = await getAllPosts()

    return posts.map((post) => ({slug: post.id}))
}

export async function generateMetadata({
    params,
}: Props): Promise<Metadata> {
    const post = await getPostById(params.id)

    return {
        title: post.titile
    }
}

const Page: NextPage<Props> = async ({ params: { id } }) => {
    const post = await getPostById(id)

    return (
        <div className='flex flex-col items-start pt-4 pl-8'>
            <h1 className='text-xl text-black'>{post.title}</h1>
            <p className='text-lg text-red-800'>{post.body}</p>
        </div>
    )
}

export default Page