'use client'

import { Button } from './ui/button'
import { signOut } from 'next-auth/react'

function AccountSingOutButton() {
  return (
    <Button  onClick={() => signOut()}
    className="border-red-500 text-red-500 hover:text-white hover:border-bg-destructive hover:bg-destructive"
    variant="outline"
  >
    Выйти
  </Button>
  )
}

export default AccountSingOutButton