"use client";

import React, { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";

interface WebinarBannerImageProps extends Omit<ImageProps, "src" | "onError"> {
  src?: string | null;
  fallbackSrc?: string;
  alt: string;
}

export default function WebinarBannerImage({
  src,
  fallbackSrc = "/images/traderoom/time-cycle-trading.jpg",
  alt,
  className,
  ...props
}: WebinarBannerImageProps) {
  const initialSrc = src && src.trim().length > 0 ? src : fallbackSrc;
  const [currentSrc, setCurrentSrc] = useState<string>(initialSrc);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const nextSrc = src && src.trim().length > 0 ? src : fallbackSrc;
    setCurrentSrc(nextSrc);
    setHasError(false);
  }, [src, fallbackSrc]);

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt}
      unoptimized={props.unoptimized ?? true}
      className={className}
      onError={() => {
        if (!hasError && currentSrc !== fallbackSrc) {
          setHasError(true);
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}
