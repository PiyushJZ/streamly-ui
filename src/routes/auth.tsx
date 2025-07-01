import { useEffect } from 'react';
import {
  Link,
  Outlet,
  createFileRoute,
  useLocation,
  useNavigate,
} from '@tanstack/react-router';
import { House } from 'lucide-react';

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
});

function RouteComponent() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === '/auth') {
      navigate({
        to: '/auth/login',
      });
    }
  });

  return (
    <div className='bg-card flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
      <div className='flex w-full max-w-sm flex-col gap-6'>
        <Link
          to='/'
          className='flex items-center gap-2 self-center font-medium'
        >
          <div className='bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md'>
            <House className='size-4' />
          </div>
          Streamly
        </Link>
        <Outlet />
      </div>
    </div>
  );
}
