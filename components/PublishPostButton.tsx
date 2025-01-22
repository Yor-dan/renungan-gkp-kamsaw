'use client';

import { useRouter } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { publishPost } from '@/app/admin/actions';
import { Globe, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

type PublishPostButtonProps = {
  postId: number;
};

export default function DeletePostButton({ postId }: PublishPostButtonProps) {
  const [isPublishing, setIsPublishing] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handlePublishPost = async () => {
    setIsPublishing(true);
    const result = await publishPost(postId);
    setIsPublishing(false);

    if (result.success) {
      router.refresh();
      toast({
        variant: 'success',
        title: 'Success',
        description: result.message,
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.message,
      });
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button
            variant="outline"
            size="icon"
            onClick={handlePublishPost}
            disabled={isPublishing}
          >
            {isPublishing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Globe className="h-4 w-4" />
            )}
            <span className="sr-only">Publish</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Publish</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
