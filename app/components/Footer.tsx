import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 flex justify-">
  <div className="container mx-auto text-center ">
    <p className="text-sm">
      © 2025 Reva Ardiansyah Abdullah. All Rights Reserved.
    </p>
    <div className="flex justify-center mt-4 space-x-4">
      <a href="https://facebook.com" target="_blank" className="hover:text-blue-500">Facebook</a>
      <a href="https://twitter.com" target="_blank" className="hover:text-blue-400">Twitter</a>
      <a href="https://www.instagram.com/reva_ardnsyh?igsh=ZjM0cWNkeXZmbmRv" target="_blank" className="hover:text-pink-500">Instagram</a>
    </div>
  </div>
</footer>
  )
}

export default Footer
