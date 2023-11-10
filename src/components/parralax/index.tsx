"use client";

import { Parallax, ParallaxProps } from "react-parallax";

export default function ParallaxComponent({
  children,
  bgImage,
  bgImageStyle,
  strength,
  className,
}: ParallaxProps) {
  return (
    <>
      <Parallax
        className='parallax'
        bgImage={bgImage}
        bgImageStyle={bgImageStyle}
        strength={strength}
      >
        {children}
      </Parallax>
    </>
  );
}
