import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';
import { useRef, useState, useEffect } from 'react'
const Home = () => {
    const getPasswords=async ()=>{
        let a = await fetch('http://localhost:3000/')
        let passwords =await  a.json()
        if (passwords) {
            console.log(passwords);
        setPassword(passwords)
        }
    }
    useEffect(() => {

        getPasswords()
    }, [])
    
        const ref = useRef()
        const passwordRef = useRef()
    const [password, setPassword] = useState([])
    const [form, setForm] = useState({
        site: "",
        username: "",
        password: ""
    })

    const imageChange = () => {
        if (ref.current.src.includes("icons/eye.png")) {
            ref.current.src = "icons/crosseye.png"
            passwordRef.current.type = 'password'
        }
        else {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = 'text'
        }
        console.log(ref.current.src);

    }
    const savePassword = async() => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            // console.log(form);
            const res = await fetch('http://localhost:3000/', {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id:form.id}),
              });
            setPassword([...password, { ...form, id: uuidv4() }])
            // console.log(password);
            await fetch('http://localhost:3000/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...form, id: uuidv4() }),
              });
              console.log(password);
              
            // localStorage.setItem('password', JSON.stringify([...password, { ...form, id: uuidv4() }]))
            setForm({
                site: "",
                username: "",
                password: ""
            })

        }
        else {
            toast('Password was not saved', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });;
        }


    }
    const handleEdit = (id) => {
        setForm({...password.filter(item => item.id === id)[0],id:id})

        setPassword(password.filter(item => item.id !== id))

        // console.log(password);


    }
    const handleDelete = async (id) => {
        let c = confirm("Really Want to Delete Password")
        if (c) {

            setPassword(password.filter(item => item.id !== id))
            // console.log(password);
            await fetch('http://localhost:3000/', {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id}),
              });
              console.log(password);
        }
    }
    const handlechange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })

    }
    const copyText = (text) => {
        toast('copy to clipboard!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });;

        navigator.clipboard.writeText(text)
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
           
            <div className=''>


                <div className=' container mx-auto w-1/2  p-4'>
                    <h1 className='text-4xl font-bold mt-10 text-center'>
                        <span className='text-purple-500'>&lt;</span>
                        <span>Pass</span>
                        <span className='text-purple-500'>OP/&gt;</span>
                    </h1>
                    <p className='text-purple-500 mb-7 text-center'>PassOp your oen password manager</p>
                    <div className='py-2 my-2 flex flex-col '>
                        <input value={form.site} name={'site'} onChange={handlechange} placeholder='Enter Website Url' type="text" className='px-4 py-1 border border-black max-sm:w-fit   rounded-full' />
                    </div>
                    <div className='gap-8 mx-auto py-2 my-2 flex  max-sm:block max-sm:my-2 '>
                        <input value={form.username} name={'username'} onChange={handlechange} placeholder='Enter Username' type="text " className='border border-black   rounded-full w-1/2 px-4 max-sm:w-fit  py-1 max-sm:my-2' />

                        <div className='flex relative w-1/2  max-sm:py-2 max-sm:my-2 '>

                            <input ref={passwordRef} placeholder='Enter Password' value={form.password} onChange={handlechange} name={'password'} type="password" className='border  border-black  rounded-full w-full  max-sm:w-fit px-4 py-1  max-sm:my-2 ' />
                            <span className='p-2 absolute  right-0 top-[0px] '>
                                <img className='cursor-pointer  max-sm:absolute max-sm: left-[115px]  max-sm:top-[25px]' src="/icons/eye.png" ref={ref} width={20} alt="eye" onClick={() => { imageChange() }} />
                            </span>
                        </div>


                    </div>

                    <button className='border flex items-center justify-center mx-auto w-fit gap-1 border-black rounded-full px-4 bg-purple-500 py-1 text-white hover:bg-purple-400 hover:font-bold' onClick={() => { savePassword() }}>Save 
                  
<lord-icon
    src="https://cdn.lordicon.com/qhkvfxpn.json"
    trigger="hover"
    style={{"color":"white"}}>
</lord-icon></button>
                </div>
                <h2 className='font-bold p-4 text-xl'>Your Passwords:</h2>
                {password.length === 0 && <div className='semi-bold mx-8 underline text-lg'>No Passwords to Show</div>}
                {password.length > 0 &&
                    <div className="table rounded-md overflow-hidden  mx-auto border border-white-900">
                        <table className="  bg-purple-300" >
                            <thead className='bg-purple-500'>
                                <tr className='p-2'>
                                    <th>Site</th>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {password.map((item, index) => {
                                    return (
                                        <tr className='text-center text-sm' key={index}>
                                            <td className='  text-center  '><div className='flex gap-1 px-1 sm:p-4 justify-center items-center ' onClick={() => { copyText(item.site) }}><a href={item.site} target='_blank'>{item.site} </a><lord-icon
                                                src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                trigger="hover"
                                                style={{ "width": "20px", "cursor": "pointer" }}>
                                            </lord-icon></div></td>
                                            <td className='  text-center  '><div className='flex gap-1 px-1 sm:p-4 justify-center items-center ' onClick={() => { copyText(item.username) }}>{item.username} <lord-icon
                                                src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                trigger="hover"
                                                style={{ "width": "20px", "cursor": "pointer" }}>
                                            </lord-icon></div></td>
                                            <td className='  text-center  '><div className='flex gap-1 px-1 sm:p-4 justify-center items-center ' onClick={() => { copyText(item.password) }}>{'*'.repeat(item.password.length)} <lord-icon
                                                src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                trigger="hover"
                                                style={{ "width": "20px", "cursor": "pointer" }}>
                                            </lord-icon></div></td>
                                            <td className='  text-center  '><div className='flex gap-2 px-1 sm:p-4 justify-center items-center ' >
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/wuvorxbv.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px" }}
                                                    onClick={() => { handleEdit(item.id) }}
                                                >
                                                </lord-icon> <lord-icon
                                                    src="https://cdn.lordicon.com/drxwpfop.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px" }}
                                                    onClick={() => { handleDelete(item.id) }}

                                                >
                                                </lord-icon>
                                            </div></td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </>
    )
}

export default Home