import React from 'react'

const Footer = () => {
  const year = new Date().getFullYear();
  return (
<footer>
  <div className="footer flex justify-between items-center bg-white dark:bg-zinc-950  relative px-12 py-4 border-t-2 border-gray-600 z-40">
    <p>Photoose @{year}</p>
    <p>All Rights Reserved.</p>
  </div>
</footer>  )
}

export default Footer