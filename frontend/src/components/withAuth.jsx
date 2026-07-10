import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function withAuth(Component, allowedRoles = []) {
  return function AuthenticatedComponent(props) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = React.useState(false);

    useEffect(() => {
      const token = localStorage.getItem('careerbridge_token') || sessionStorage.getItem('careerbridge_token');
      const userStr = localStorage.getItem('careerbridge_user') || sessionStorage.getItem('careerbridge_user');
      
      if (!token || !userStr) {
        const currentPath = window.location.pathname + window.location.search;
        router.push(`/sign-in?redirect=${encodeURIComponent(currentPath)}`);
        return;
      }

      try {
        const user = JSON.parse(userStr);
        if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
          // Redirect to Access Denied page if user lacks required role
          router.push('/access-denied');
        } else {
          setIsAuthorized(true);
        }
      } catch (err) {
        const currentPath = window.location.pathname + window.location.search;
        router.push(`/sign-in?redirect=${encodeURIComponent(currentPath)}`);
      }
    }, []);

    if (!isAuthorized) {
      return null; // Or return a <SkeletonDashboard /> depending on UX preference
    }

    return <Component {...props} />;
  };
}
