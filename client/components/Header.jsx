import React from 'react'
import Link from 'next/link'

const Category=[
    {
        name:'React',
        slug:'react'
    },
    {
        name:'Web Develeopment',
        slug:'web-dev'
    }
]

const Header = () => {
  return (
    <div className="container mx-auto px-10 mb-8">
       <div className="border-b w-full inline-block border-blue-400 pu-8">
        <div className="md:float-left  inline-block">
            <Link href="/">
             <span className="cursor-pointer font-bold text-4xl text-white ">
                GraphCMS
             </span>
            </Link>
        </div>
        <div className="hidden md:float-left md:contents ">
         {
            Category.map((category)=>{
               return  (<Link href={`/${category.slug}`} key={category.slug}>
                    <span className='md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer'>
                      { category.name}
                    </span>
                </Link>)
            })
         }
        </div>
       </div>
    </div>
  )
}

export default Header
