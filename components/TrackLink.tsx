'use client';

import { trackEvent } from './GoogleAnalytics';
import React from 'react';

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  eventName: string;
  eventParams?: Record<string, string | number>;
  children: React.ReactNode;
}

export default function TrackLink({ eventName, eventParams, onClick, children, ...props }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackEvent(eventName, eventParams);
    onClick?.(e);
  };
  return (
    <a {...props} onClick={handleClick}>
      {children}
    </a>
  );
}
