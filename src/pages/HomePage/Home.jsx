import React from "react";
import HeroSection from "./HeroSection";
import Dock from "./Dock";
import Feature from "./Feature";

import InfinitiveCarousel from "./InfinitiveCarousel/page";
import ZoomParallaxPage from "./ZoomParralax/page";
import QuoteSection from "./Quote/Quote";
import TextOpacityScrollSection from "./TextOpacityScroll/page";
import CardLink from "@/components/CardLink";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <Dock />
      <Feature />
      <QuoteSection />
      <CardLink
        imgSrc="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_1824,c_limit/b165c418-4f83-4cd2-82b7-91a9c4251a6c/nike-just-do-it.jpg"
        name="Air Jordan 1"
        title="ALL COMFORT. NO PRESSURE"
        description="Lively street art and global football roots inspire Giannis’ latest
        colourway."
      />
      <ZoomParallaxPage />
      <InfinitiveCarousel />
    </div>
  );
}
