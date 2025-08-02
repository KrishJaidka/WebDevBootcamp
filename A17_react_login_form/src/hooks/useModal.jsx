import React , { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useModal = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const state = location?.state || {}; // or const state = location.state ?? {}; 
    // const backgroundLocation = state?.backgroundLocation;
    const { backgroundLocation } = state;
    const isModal = backgroundLocation != null

    const searchParams = new URLSearchParams(location.search);
    const modalType = searchParams.get("type") || "login";

    const openModal = (type) => {
        navigate(`/auth?type=${type}`, { state: { backgroundLocation: location } });
    }

    const closeModal = () => {
        navigate(-1); // or navigate(location.state.backgroundLocation)
    };

    useEffect(() => {
        if (isModal) {
            document.body.style.overflow = "hidden";
            return () => {
                document.body.style.overflow = "auto";
            };
        }
    }, [isModal]);

    return{ 
        isModal,
        modalType,
        openModal,
        closeModal,
        backgroundLocation
    };
};

export default useModal;
