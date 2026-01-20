import React from 'react'

function BlogCard({ title, date, image, content }) {
    return (
        <div className='w-80 bg-white border border-gray-400 py-4 px-5'>
            <div className='flex justify-between items-start gap-4'>
                <div className='flex flex-col flex-1 min-w-0 gap-1'>
                    <div className='flex flex-row items-center gap-2'>
                        <h1 className='text-xl font-bold wrap-break-word'>{title}</h1>
                        <span>·</span>
                        <p className='text-xs text-gray-600'>{date}</p>
                    </div>
                    <p className='text-sm leading-relaxed warp-break-word'>
                        {content || 'No content available'}
                    </p>
                    <div className='w-20 h-20 shrink-0'>
                        <img src={image} alt="" className='w-full h-full object-cover rounded' />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default BlogCard