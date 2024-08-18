import React from 'react'

const Navbar = () => {
  return (
    <nav className=' bg-purple-400'>
     <div className='flex justify-between p-3 items-center mx-auto max-sm:mx-1 w-1/2'>

     <div className="logo text-xl font-bold">
     <span>&lt;</span>
            <span>Pass</span>
            <span>OP/&gt;</span>
        </div>
        <ul className='flex max-sm:mx-5 gap-6'>
            <li><a href='' className='hover:font-bold'>Home</a></li>
            <li><a href='' className='hover:font-bold'>Paswords</a></li>
            <li><a href='' className='hover:font-bold'>Contact</a></li>
        </ul>
     </div>
    </nav>
  )
}

export default Navbar