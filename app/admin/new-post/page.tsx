'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { BannerImageUpload } from './components/ImageInput';

export default function NewBlogPost() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date>();
  const [banner, setBanner] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (status: 'draft' | 'published') => {
    setIsSubmitting(true);
    try {
      // Simulating an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Form submitted:', { title, date, banner, status });
      toast({
        variant: 'success',
        title: 'Success!',
        description: `Post ${
          status === 'draft' ? 'saved as draft' : 'published'
        } successfully.`,
      });
      router.push('/admin'); // Redirect to admin dashboard after successful submission
    } catch (error) {
      console.error('Failed to save post:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save the post. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-3xl font-bold mb-5">Create New Blog Post</h1>
      <form className="space-y-8">
        <div>
          <Label htmlFor="banner" className="block mb-2">
            Banner Image
          </Label>
          <BannerImageUpload onImageChange={setBanner} />
        </div>

        <div>
          <Label htmlFor="title">Blog Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            className="mt-1"
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
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSubmit('draft')}
            disabled={isSubmitting}
          >
            Save as Draft
          </Button>
          <Button
            type="button"
            onClick={() => handleSubmit('published')}
            disabled={isSubmitting}
          >
            Publish
          </Button>
        </div>
      </form>
    </div>
  );
}
