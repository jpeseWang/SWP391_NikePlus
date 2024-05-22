import React from "react";
import HeroSection from "./HeroSection";
import Dock from "./Dock";
import Feature from "./Feature";
import ReviewGallery from "./ReviewGallery";
import InfinitiveScroll from "./InfinitiveScroll/page"
import InfinitiveCarousel from "./InfinitiveCarousel/page"
import ZoomParallaxPage from "./ZoomParralax/page"
import QuoteSection from "./Quote/Quote"
import TextOpacityScrollSection from "./TextOpacityScroll/page"
export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <Dock />
      <Feature />

      Horizontal Section
      <br></br>
      Parallax Scroll
      <br></br>
      Zoom Parallax
      <br></br>
      Horizontal Scroll
      <br></br>

      <QuoteSection />


      <div className="hero-section px-4 sm:px-8 md:px-16 lg:px-20">
        <h2 className="text-xl text-gray-900 mt-40">Just in</h2>
        <img
          className="max-w-screen mt-6"
          src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_1824,c_limit/b165c418-4f83-4cd2-82b7-91a9c4251a6c/nike-just-do-it.jpg"
          alt=""
        />
        <div
          className="items-center mx-auto sm:mx-10 md:mx-20 p-2 text-center sm:p-4 md:p-8 lg:p-12 mt-4"
          aria-label="Global"
        >
          <p className="text-3xl sm:text-3xl md:text-5xl lg:text-7xl font-nike">
            CHECK THE<br></br> FOOTWORK IN <br></br>THE ZOOM FREAK 5<br></br>{" "}
            &apos;MADE IN SEPOLIA&apos;
          </p>
          <p className="mt-4 lg:text-2xl">
            Lively street art and global football roots inspire Giannis’ latest
            colourway.
          </p>
          <button className="bg-black text-white rounded-2xl px-4 py-1 mt-4">
            Shop
          </button>
        </div>
      </div>
      <ZoomParallaxPage />
      <TextOpacityScrollSection />
      {/* <InfinitiveCarousel /> */}

    </div>
  );
}
