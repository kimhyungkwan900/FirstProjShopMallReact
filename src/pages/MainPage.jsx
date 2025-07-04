import { useEffect, useState } from "react";
import MainHeader from "../features/common/Header/MainHeader";
import BannerSlider from "../component/common/Banner/BannerSlider";

const MainPage = () =>{
    
    const [banner, setBanners] = useState([]);

    useEffect(() => {
        fetch('api/banner/main')
        .then((res) => res.json())
        .then((data) => setBanners(data))
        .catch((err) => console.error('배너 로딩 실패: ', err));
    });

    return(
        <div>
            <div>
                <MainHeader />
            </div>
            <div>
                <BannerSlider images={banner} />
            </div>
        </div>
    )
}

export default MainPage;