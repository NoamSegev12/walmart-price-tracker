declare module 'react-rating-stars-component' {
  import * as React from 'react';

  interface ReactStarsProps {
    count?: number;
    value?: number;
    size?: number;
    isHalf?: boolean;
    edit?: boolean;
    onChange?: (newRating: number) => void;
    emptyIcon?: React.ReactElement;
    halfIcon?: React.ReactElement;
    filledIcon?: React.ReactElement;
    activeColor?: string;
    color?: string;
    classNames?: string;
    char?: string;
    a11y?: boolean;
    // Add other props you use from the library
  }

  const ReactStars: React.FC<ReactStarsProps>;
  export default ReactStars;
}