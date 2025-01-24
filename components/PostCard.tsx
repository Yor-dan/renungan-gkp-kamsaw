import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/app/lib/definitions';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatDateToIndo, createExcerpt } from '@/app/lib/utils';

type PostCardProps = Omit<Post, 'id' | 'verse' | 'book' | 'deleted_at'>;

export default function PostCard({
  slug,
  image_url,
  publish_date,
  title,
  body,
}: PostCardProps) {
  const postYear = new Date(publish_date).getFullYear();
  const postMonth = new Date(publish_date).getMonth() + 1;

  return (
    <Link href={`/${postYear}/${postMonth}/${slug}`}>
      <Card className="shadow h-full overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
        <div className="relative h-64 w-full">
          <Image
            src={image_url}
            alt={'post card image'}
            fill
            className="object-cover"
          />
        </div>
        <CardContent className="flex-grow flex flex-col p-4">
          <p className="text-sm text-muted-foreground mb-2">
            {formatDateToIndo(publish_date)}
          </p>
          <CardHeader className="p-0">
            <CardTitle className="text-lg font-semibold mb-2">
              {title}
            </CardTitle>
          </CardHeader>
          <p className="text-muted-foreground text-sm">{createExcerpt(body)}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
