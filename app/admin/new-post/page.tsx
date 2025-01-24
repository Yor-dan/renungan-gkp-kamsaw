'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { NewPost } from '@/app/lib/definitions';
import { createPost } from '@/app/admin/actions';
import ImageInput from '@/components/ImageInput';

export default function NewPostPage() {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [publishDate, setPublishDate] = useState<Date>(new Date());
  const [verse, setVerse] = useState('');
  const [book, setBook] = useState('');
  const [body, setBody] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!image || !title || !publishDate || !body) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please fill in all required fields.',
      });
      return;
    }

    const newPost: NewPost = {
      image,
      title,
      publish_date: publishDate,
      verse,
      book,
      body,
    };

    startTransition(async () => {
      const result = await createPost(newPost);

      if (result.success) {
        toast({
          variant: 'success',
          title: 'Success!',
          description: 'Post created successfully.',
        });
        router.push('/admin');
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description:
            result.error || 'Failed to save the post. Please try again.',
        });
      }
    });
  };

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-5">Create New Post</h1>
        <form
          className="space-y-8"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div>
            <Label htmlFor="image" className="block mb-2">
              Post Image
            </Label>
            <ImageInput onImageChange={setImage} />
          </div>

          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="date">Publish Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full justify-start text-left font-normal mt-1',
                    !publishDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {publishDate ? (
                    format(publishDate, 'PPP')
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={publishDate}
                  onSelect={(date) => setPublishDate(date || new Date())}
                  initialFocus
                  required
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="verse">Verse</Label>
            <Input
              id="verse"
              value={verse}
              onChange={(e) => setVerse(e.target.value)}
              placeholder="E.g. We love because he first loved us."
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="book">Book</Label>
            <Input
              id="book"
              value={book}
              onChange={(e) => setBook(e.target.value)}
              placeholder="E.g. 1 John 4:19"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="body">Body</Label>
            <Textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your post content here..."
              className="mt-1"
              rows={10}
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Post...
                </>
              ) : (
                'Create Post'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
