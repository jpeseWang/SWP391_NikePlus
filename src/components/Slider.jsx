import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
const slider = [
    {
        id: 1,
        name: "Nike Air Force 1 '07",
        price: 2929,
        description: "Men's Shoes",
        imageSrc:
            "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_2.0/w_479,c_limit/e6da41fa-1be4-4ce5-b89c-22be4f1f02d4/air-force-1-07-shoes-WrLlWX.png",
        imageAlt: "",
        href: "#",
    },
    {
        id: 2,
        name: "Nike Air Force 1 '07",
        price: 2929,
        description: "Women's Shoes",
        imageSrc:
            "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_2.0/w_479,c_limit/e777c881-5b62-4250-92a6-362967f54cca/air-force-1-07-shoe-NMmm1B.png",
        imageAlt: "",
        href: "#",
    },
    {
        id: 3,
        name: "Nike Dri-FIT ",
        price: 1739,
        description: "Men's Short-Sleeve",
        imageSrc:
            "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_2.0/w_479,c_limit/ff7e4ad8-6b88-48e0-a8be-251f3acf4b32/dri-fit-short-sleeve-basketball-top-H50T3m.png",
        imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
        href: "#",
    },
    {
        id: 4,
        name: "Nike Dri-FIT",
        price: 869,
        description: "Women's T-shirt",
        imageSrc:
            "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_2.0/w_479,c_limit/58d6119e-0de8-454f-9a6e-0a08ac976bae/dri-fit-swoosh-fly-t-shirt-LcsRwS.png",
        imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
        href: "#",
    },
    {
        id: 5,
        name: "Nike Motiva Premium",
        price: 3239,
        description: "Women's Premium Walking Shoes",
        imageSrc:
            "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_2.0/h_554,c_limit/32a275c6-3ab0-4fe0-b71d-4131418f83a8/motiva-walking-shoes-162GNq.png",
        imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
        href: "#",
    },
    {
        id: 6,
        name: "Nike Downshifter 12",
        price: 1909,
        description: "Women's Road Running Shoes",
        imageSrc:
            "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_2.0/h_554,c_limit/bc21bec1-52e5-4c9e-9f59-0d7145b86a1f/downshifter-12-road-running-shoes-NxhwFD.png",
        imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
        href: "#",
    },
];
export default function Slider() {
    return (
        <div><div className="px-4 sm:px-6 lg:px-8 my-12">
            <h2 className="text-xl text-gray-900 my-4">Trending Now</h2>
            <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                breakpoints={{
                    390: {
                        slidesPerView: 1,
                    },
                    576: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1000: {
                        // width: 576,
                        slidesPerView: 4,
                    },
                }}
            >
                {slider.map((callout) => (
                    <SwiperSlide key={callout.name}>
                        <div className="group relative mb-10">
                            <div className="relative h-full w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 ">
                                <img
                                    src={callout.imageSrc}
                                    alt={callout.imageAlt}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                            <h3 className="mt-6 text-regular font-medium text-gray-900 flex items-center justify-between">
                                <span>{callout.name}</span>
                                <span className="text-black pr-4">
                                    {" "}
                                    {callout.price.toLocaleString()},000₫
                                </span>
                            </h3>
                            <p className=" text-gray-500">{callout.description}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div></div>
    )
}
