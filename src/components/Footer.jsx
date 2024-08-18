import React from 'react'

const Footer = () => {
    return (
        <div className=" flex mt-[150px] max-sm:flex-col max-sm:gap-1   items-center justify-evenly gap-5 footer bg-purple-800 text-white p-1  mx-auto text-center ">
            <p className=' font-bold  text-lg'>All Right are Reserved Copyright &copy; 2024 </p>
            <div>

            <h2 className='text-center  font-bold p-2 font-xl underline'><a className='flex items-center text-lg text-purple-100 justify-center gap-1' href='https://github.com/ysd2445' target='_blank'>

                Edit This Page on <img className='invert rounded-full ' src="/icons/github.jpeg"width={30}  alt="" />
            </a>
            </h2>
            <p className='text-xl'>  <span className=' font-bold  '>&lt;</span>
                <span className=' font-bold '>Pass</span>
                <span className=' font-bold '>OP/&gt;</span>
            </p>
            </div>
            <p className=' text-purple-100  font-bold underline text-xl'><a href="https://spotifyrandam.freewebhostmost.com/" target='_blank'>So Some other Work</a></p>
        </div>

    )
}

export default Footer