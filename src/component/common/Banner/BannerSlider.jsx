import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const BannerSlider = ({images}) => {

    const isArray = Array.isArray(images);
    const isEmpty = !isArray || images.length === 0;
    
    return(
        <div className="w-full aspect-[21/9] bg-gray-200">
            <Swiper modules={[Navigation, Autoplay]} loop  autoplay={{ delay: 3000 }} navigation={true} className="w-full h-full">
                {isEmpty ? (
                    <SwiperSlide>
                        <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-600 text-xl">
                            등록된 배너가 없습니다.
                        </div>
                    </SwiperSlide>
                ) : (
                    images.map((img) => (
                        <SwiperSlide key={img.id}>
                            <a href={img.link}>
                                <img src={img.imageUrl} alt={img.alt} className="w-full h-full object-fill" />
                            </a>
                    </SwiperSlide>
                    ))
                )}
            </Swiper>
        </div>
    )
}

export default BannerSlider;