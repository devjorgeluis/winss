import { useContext, useRef, useState } from "react";
import { AppContext } from "../AppContext";
import { useNavigate } from "react-router-dom";


const ProviderContainer = (props) => {
    const { contextData } = useContext(AppContext);
    const navigate = useNavigate();

    const handleCategoryClick = (category, index) => {
        if (props.pageType === 'home') {
            navigate(`/casino?provider=${encodeURIComponent(category.name)}&providerId=${category.id}`);
        } else {
            if (props.onCategoryClick) {
                props.onCategoryClick(category, category.id, category.table_name, index, true);
            }
            if (props.onCategorySelect) {
                props.onCategorySelect(category);
            }
        }
    };

    return (
        <>
            {props.categories.map((category, index) => (
                <div
                    key={index}
                    className={props.selectedCategoryIndex === index ? "provider-title provider-active-title p-0" : "provider-title p-0"}
                    active={(props.selectedCategoryIndex === index).toString()}
                    onClick={() => handleCategoryClick(category, index)}
                >
                    <a className="p-0">
                        <img src={contextData.cdnUrl + category.image_local} />
                        <div>{category.name}</div>
                    </a>
                </div>
            ))}
        </>
    )
};

export default ProviderContainer;