import AuctionHeroSection from "./component/HeroSection";
import AuctionList from "./component/AuctionCard";
import CommunityTabs from "../components/CommunityTabs";
export default function AuctionPage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <CommunityTabs />
      </div>

      <AuctionHeroSection />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Auction
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
        </div>
      </div>

      <AuctionList />
    </div>
  );
}
