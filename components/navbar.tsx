'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navItems = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/about' },
  { title: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [prevScrollPos, setPrevScrollPos] = React.useState(0);
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300',
        visible ? 'translate-y-0' : '-translate-y-full'
      )}
    >
      <div className="px-4 flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-lg font-bold">Renungan Harian</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="md:text-lg transition-colors hover:text-foreground/80 text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[200px] sm:w-[250px]">
            <MobileNav items={navItems} setIsOpen={setIsOpen} />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

interface MobileNavProps {
  items: { title: string; href: string }[];
  setIsOpen: (open: boolean) => void;
}

function MobileNav({ items, setIsOpen }: MobileNavProps) {
  return (
    <div className="flex flex-col space-y-4">
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="text-foreground/70 transition-colors hover:text-foreground"
          onClick={() => setIsOpen(false)}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
}
