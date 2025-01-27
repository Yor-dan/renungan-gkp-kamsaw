import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { login } from '@/app/admin/actions';
import { SubmitButton } from '@/components/SubmitButton';

export default function AdminLogin() {
  return (
    <div className="flex justify-center h-screen">
      {/* Login form */}
      <div className="flex items-center justify-center pb-12 bg-background md:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold tracking-tight">
              Admin Dashboard
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your credentials to gain access.
            </p>
          </div>
          <form action={login} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <SubmitButton loadingText="Signing in..." className="w-full">
                Sign in
              </SubmitButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
