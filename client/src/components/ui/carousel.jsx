// src/components/ui/carousel.jsx
import React from "react";

export const Carousel = ({ children, className }) => {
  return (
    <div className={`overflow-hidden relative ${className}`}>{children}</div>
  );
};

export const CarouselContent = ({ children, className, ...props }) => {
  return (
    <div className={`flex transition-all duration-300 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CarouselItem = ({ children, className }) => {
  return <div className={`min-w-full ${className}`}>{children}</div>;
};

export const CarouselPrevious = ({ onClick, className }) => {
  return (
    <button onClick={onClick} className={className}>
      ◀
    </button>
  );
};

export const CarouselNext = ({ onClick, className }) => {
  return (
    <button onClick={onClick} className={className}>
      ▶
    </button>
  );
};
