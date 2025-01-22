'use server';

import { sql } from '@vercel/postgres';
import Link from 'next/link';
import { Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ModeToggle } from '@/components/ui/mode-toggle';
import LogoutButton from '@/components/LogoutButton';
import { formatDateToIndo } from '../lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import DeletePostButton from '@/components/DeletePostButton';
import { Toaster } from '@/components/ui/toaster';
import PublishPostButton from '@/components/PublishPostButton';

export default async function AdminPage() {
  const query = await sql`SELECT * FROM renungan
    ORDER BY date DESC`;
  const posts = query.rows;

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="flex">
              <ModeToggle />
              <LogoutButton />
            </div>
          </div>
        </header>

        <main className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Posts</h2>
            <Button asChild>
              <Link href="/admin/new-post">Create New Post</Link>
            </Button>
          </div>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">
                      <Button asChild variant="link" className="p-0">
                        <Link href={`admin/preview/${post.id}`}>
                          {post.title}
                        </Link>
                      </Button>
                    </TableCell>
                    <TableCell>{formatDateToIndo(post.date)}</TableCell>
                    <TableCell>
                      {post.deleted_at ? 'Deleted' : 'Published'}
                    </TableCell>
                    <TableCell className="text-right">
                      <TooltipProvider>
                        <div className="flex justify-end gap-2">
                          <Tooltip>
                            <TooltipTrigger>
                              <Button variant="outline" size="icon" asChild>
                                <Link href={`/admin/edit/`}>
                                  <Edit className="h-4 w-4" />
                                  <span className="sr-only">Edit</span>
                                </Link>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Edit</TooltipContent>
                          </Tooltip>
                          {post.deleted_at ? (
                            <PublishPostButton postId={post.id} />
                          ) : (
                            <DeletePostButton postId={post.id} />
                          )}
                        </div>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </>
  );
}
