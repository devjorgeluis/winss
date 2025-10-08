

import { useState } from "react";
import ImgSprintgames from "/src/assets/img/sprintgames.png";
import ImgPragmaticplay from "/src/assets/img/pragmaticplay.png";
import ImgAlgnet from "/src/assets/img/algnet.png";
import ImgTvbet from "/src/assets/img/tvbet.png";

const LiveMenuProvider = () => {
    const [activeProvider, setActiveProvider] = useState(-1);

    const handleProviderClick = (index) => {
        setActiveProvider(index);
    };

    const providers = [
        { id: 0, name: "Sprintgames", img: ImgSprintgames },
        { id: 1, name: "Pragmaticplay", img: ImgPragmaticplay },
        { id: 2, name: "Algnet", img: ImgAlgnet },
        { id: 3, name: "Tvbet", img: ImgTvbet }
    ];

    return (
        <div className="menu-provider live-menu-provider mt-2">
            <i id="prev" aria-hidden="true" className="fa fa-arrow-circle-left"></i>
            <div id="menu-scroll">
                {providers.map((provider, index) => (
                    <div 
                        key={provider.id}
                        className={`provider-title-sub-bc col-4 col-sm-4 col-md-3 col-lg-2 col-xl-2 ${activeProvider === index ? 'CheckActive' : ''}`}
                        onClick={() => handleProviderClick(index)}
                    >
                        <img id="imagen-provider" src={provider.img} alt={provider.name} />
                    </div>
                ))}
            </div>
            <i id="next" aria-hidden="true" className="fa fa-arrow-circle-right"></i>
        </div>
    )
};

export default LiveMenuProvider;
