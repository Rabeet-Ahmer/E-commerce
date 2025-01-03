import { Link } from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
    <header>
        <nav className='flex justify-between items-center text-black bg-slate-600/30 p-4 mx-3 rounded-md backdrop-blur-sm'>
            <h1 className='font-odibee text-5xl'>Storees</h1>
            <ul className='flex items-center gap-4 font-poppins'>
                <li><Link href='/'>Home</Link></li>
                <li><Link href='/'>Products</Link></li>
            </ul>
        </nav>
    </header>
  )
}

export default Header