import sharp from 'sharp';

export const formatDateToIndo = (date: string) => {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  const d = new Date(date);
  return `${days[d.getDay()]}, ${d.getDate()}
  ${months[d.getMonth()]} ${d.getFullYear()}`;
};

export const createExcerpt = (text: string, maxLength: number = 128) => {
  if (text.length <= maxLength) return text;
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace === -1) return truncated + '...';
  return truncated.substring(0, lastSpace) + '...';
};

export const convertToNum = (
  input: string,
  defaultValue: number = 6
): number => {
  const parsed = parseInt(input, 10);
  return isNaN(parsed) ? defaultValue : parsed;
};

export async function compressImage(file: File): Promise<Buffer> {
  const buffer = await file.arrayBuffer();
  let quality = 80;
  let outputBuffer: Buffer;

  do {
    outputBuffer = await sharp(Buffer.from(buffer))
      .resize(1200, 630, { fit: 'inside', withoutEnlargement: true })
      .avif({ quality })
      .toBuffer();

    if (outputBuffer.length <= 200 * 1024) {
      return outputBuffer;
    }

    quality -= 5;
  } while (quality > 10);

  throw new Error('Unable to process image to under 200KB');
}
