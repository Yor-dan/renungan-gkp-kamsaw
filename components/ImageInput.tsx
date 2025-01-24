import { useState } from 'react';
import { ImageIcon, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

type ImageInputProps = {
  onImageChange: (file: File | null) => void;
};

export default function ImageInput({ onImageChange }: ImageInputProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onImageChange(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onImageChange(null);
  };

  return (
    <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 h-[300px] flex flex-col items-center justify-center text-center">
      <input
        id="banner"
        type="file"
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        accept="image/*"
        required
      />
      {previewUrl ? (
        <>
          <Image
            src={previewUrl || '/placeholder.svg'}
            alt="image preview"
            className="absolute inset-0 w-full h-full object-cover"
            fill
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute bottom-2 left-2 z-20"
            onClick={handleRemoveImage}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </>
      ) : (
        <>
          <ImageIcon className="w-10 h-10 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">
            Click to upload or drag and drop
          </p>
        </>
      )}
    </div>
  );
}
