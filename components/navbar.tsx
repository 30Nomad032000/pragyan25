import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const Navbar = () => {
    return (
        <div
            className='mx-auto w-[80%] lg:w-[60%] text-white rounded-[50px] py-4 px-2 lg:px-6 flex items-center justify-between absolute z-10 top-10 left-0 right-0'
            style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
            <div className='flex items-center space-x-2 font-semibold text-xl justify-center md:justify-start w-full'>
                <Image src="/logo.png" alt='logo' width={32} height={32} className='' />
                <Link href='/'>Pragyan</Link>
            </div>
            <div className='items-center space-x-8 font-semibold text-sm hidden md:flex'>
                <Link href='/' className='hover:text-cyan-400 transition-colors'>Home</Link>
                <Link href='/events' className='hover:text-cyan-400 transition-colors'>Events</Link>
                <Link href='/#contact' className='hover:text-cyan-400 transition-colors'>Contact</Link>
            </div>
        </div>
    )
}

export default Navbar