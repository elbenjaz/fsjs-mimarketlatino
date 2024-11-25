import { useEffect, useState } from "react";

// react-bootstrap
import { Button } from "react-bootstrap";

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // maneja la visibilida de botón para cuando te pasas de la mitad de la página
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);
    
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        isVisible && (
            <Button onClick={scrollToTop} className="ms-3 fixed bottom-5 right-5" aria-label="Moverse hacia arriba">
                <i className="bi bi-arrow-up-circle btn-primary fs-6"></i>
            </Button>
        )
    );
};

export default ScrollToTopButton;
