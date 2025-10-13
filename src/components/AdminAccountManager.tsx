// Contoh penggunaan di komponen React
import React, { useState, useEffect } from 'react'
import { AuthService } from '../lib/auth'
import { DatabaseService, AdminAccount } from '../lib/database'

export const AdminAccountManager: React.FC = () => {
  const [accounts, setAccounts] = useState<AdminAccount[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAccounts()
  }, [])

  const loadAccounts = async () => {
    const { data, error } = await DatabaseService.getAdminAccounts()
    if (data) setAccounts(data)
    setLoading(false)
  }

  const deleteAccount = async (id: string) => {
    if (confirm('Yakin ingin menghapus akun ini?')) {
      const { error } = await DatabaseService.deleteAdminAccount(id)
      if (!error) {
        setAccounts(accounts.filter(acc => acc.id !== id))
      }
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-4">
      <h2>Kelola Akun Admin</h2>

      {accounts.map(account => (
        <div key={account.id} className="border p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <h3>{account.name}</h3>
              <p>{account.email}</p>
              <p>Role: {account.role}</p>
            </div>
            <button
              onClick={() => deleteAccount(account.id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Hapus Akun
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
