'use client';

import { useTransition } from 'react';
import { logout } from '@/app/admin/actions';
import { SubmitButton } from '@/components/SubmitButton';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(() => {
      logout();
    });
  };

  return (
    <form action={handleLogout}>
      <SubmitButton variant="ghost" loadingText="Logging out...">
        <LogOut className="h-4 w-4" />
        Logout
      </SubmitButton>
    </form>
  );
}
