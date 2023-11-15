'use client'

import useAuthCheck from "@/hooks/auth-check"

const DashboardPage = () => {
  useAuthCheck()
  return (
    <div>DashboardPage</div>
  )
}

export default DashboardPage