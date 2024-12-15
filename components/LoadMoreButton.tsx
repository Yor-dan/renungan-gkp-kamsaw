import { Button } from './ui/button';
import { Plus } from 'lucide-react';

export default function LoadMoreButton() {
  return (
    <div className="mt-12 flex justify-center">
      <Button className="flex items-center gap-2">
        Load more <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
}
