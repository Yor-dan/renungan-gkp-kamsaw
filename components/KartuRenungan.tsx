import Link from 'next/link';
import Image from 'next/image';
import { Renungan } from '@/app/lib/definitions';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { createExcerpt } from '@/app/lib/utils';
import { formatDateToIndo } from '@/app/lib/utils';

type KartuRenunganProps = Omit<Renungan, 'verse' | 'verse_ref'>;

export default function KartuRenungan({
  id,
  image,
  date,
  title,
  body,
}: KartuRenunganProps) {
  return (
    <Link href={`renungan/${id}`}>
      <Card className="shadow h-full overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
        <div className="relative h-64 w-full">
          <Image
            src={image}
            alt={'gambar thumbnail kartu renungan'}
            fill
            className="object-cover"
          />
        </div>
        <CardContent className="flex-grow flex flex-col p-4">
          <p className="text-sm text-muted-foreground mb-2">
            {formatDateToIndo(date)}
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
