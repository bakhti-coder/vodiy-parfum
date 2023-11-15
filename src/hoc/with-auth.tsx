"use client"

import useAuth from '@/store/auth';
import ROLES from '@/types/roles';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

function withAuth<P extends React.JSX.IntrinsicAttributes>(
  Component: React.ComponentType<P>
) {

  const AuthComponent = (props: P) => {
    const { isAuthenticated, user } = useAuth();
    const router = useRouter();
    const pathname = usePathname()

    useEffect(() => {
        if (isAuthenticated) {
          if(pathname.startsWith('/admin') && user?.role !== ROLES.ADMIN) {
            router.push('/login')
          }
        } else {
          router.push('/login')
        }
    }, [isAuthenticated, router, user, pathname])

    return <Component {...props} />;
  };

  return AuthComponent;
}

export default withAuth;