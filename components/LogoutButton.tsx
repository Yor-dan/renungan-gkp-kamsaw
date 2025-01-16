'use client';

import { Button } from '@/components/ui/button';
import { LogOut, Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { useTransition } from 'react';
import { logout } from '@/app/admin/actions';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="ghost"
      className="flex items-center gap-2"
      disabled={pending}
    >
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <LogOut className="h-4 w-4" />
      )}
      {pending ? 'Logging out...' : 'Logout'}
    </Button>
  );
}

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
      <SubmitButton />
    </form>
  );
}
