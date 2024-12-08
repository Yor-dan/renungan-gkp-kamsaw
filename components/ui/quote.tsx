import React from 'react';
import { cn } from '@/lib/utils';

interface QuoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
  quote: string;
  quote_ref: string;
}

const Quote = React.forwardRef<HTMLQuoteElement, QuoteProps>(
  ({ className, quote, quote_ref, ...props }, ref) => {
    return (
      <blockquote
        ref={ref}
        className={cn(
          'border-l-4 border-primary pl-4 py-2 mb-8 italic text-lg text-muted-foreground',
          className
        )}
        {...props}
      >
        {quote}
        <br />
        <br />
        {quote_ref}
      </blockquote>
    );
  }
);
Quote.displayName = 'Quote';

export { Quote };
