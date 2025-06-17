'use client'

import { getCurrentUser, signOut } from '../lib/supabase'
import { useEffect, useState } from 'react'

export default function Header() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCurrentUser().then((user) => {
      setUser(user)
      setLoading(false)
    })
  }, [])

  const handleSignOut = async () => {
    await signOut()
    setUser(null)
  }

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-900">Outlook Email Agent</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {loading ? (
            <span className="text-sm text-gray-500">Loading...</span>
          ) : user ? (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-700">{user.email}</span>
              <button
                onClick={handleSignOut}
                className="text-sm text-gray-600 hover:text-gray-900 px-3 py-1 rounded border border-gray-300 hover:bg-gray-50"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <span className="text-sm text-gray-500">Not signed in</span>
          )}
        </div>
      </div>
    </header>
  )
} 