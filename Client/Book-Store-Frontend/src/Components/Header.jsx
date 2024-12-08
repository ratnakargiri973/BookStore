import {Link} from 'react-router-dom'

function Header() {
  return (
    <header className='flex justify-between items-center px-8 bg-green-600 text-white py-4'>
        <h1 className='font-bold text-3xl'>
            <Link to="">Book Store</Link>
        </h1>
        <ul>
            <li className='flex justify-center align-center gap-3'>
            <Link to="/" className='hover:text-gray-300'>Home</Link>
            <Link to="" className='hover:text-gray-300'>Contact</Link>
            <Link to="" className='hover:text-gray-300'>Log In</Link>
            <Link to="" className='hover:text-gray-300'>Sign Up</Link>
            </li>
        </ul>
    </header>
  )
}

export default Header
