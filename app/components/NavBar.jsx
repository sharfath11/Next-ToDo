import React from 'react'

function NavBar() {
  return (
    <div className='flex bg-orange-600 navbar'>
      <h2>ToDo App</h2>
      <ul className='flex navBar-links'>
        <li>Home</li>
        <li>Products</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </div>
  )
}

export default NavBar
