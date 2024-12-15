import Link from 'next/link';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

type LoadMoreButtonProps = {
  limit: number;
};

export default function LoadMoreButton({ limit }: LoadMoreButtonProps) {
  return (
    <div className="mt-12 flex justify-center">
      <Link href={`/?limit=${limit + 3}`} scroll={false}>
        <Button className="flex items-center gap-2">
          Load more <Plus className="w-4 h-4" />
        </Button>
      </Link>
    </div>
  );
}
