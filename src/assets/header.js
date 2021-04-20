import "./cakeDOM";
import themeSlider from "./themeSlider";

if (typeof window.cake !== "object") {
    window.cake = {};
}

const defaultOptions = {
    closeMobileMenuBreakpoint: 960,
    headerElements: [],
    headerQuerySelector: '*[data-controller="header"]',
    burgerMenuElement: null,
    burgerMenuQuerySelector: '*[data-controller="header/burgermenu"]',
    navigationElement: null,
    navigationQuerySelector: '*[data-controller="header/navigation"]',
    sliderMainNavButtonPreviousElement: null,
    sliderMainNavButtonPreviousQuerySelector: '*[data-controller="header/navigation/menu/main/slider/prev"]',
    sliderMainNavButtonNextElement: null,
    sliderMainNavButtonNextQuerySelector: '*[data-controller="header/navigation/menu/main/slider/next"]',
    sliderSubNavButtonPreviousElement: null,
    sliderSubNavButtonPreviousQuerySelector: '*[data-controller="header/navigation/menu/sub/slider/prev"]',
    sliderSubNavButtonNextElement: null,
    sliderSubNavButtonNextQuerySelector: '*[data-controller="header/navigation/menu/sub/slider/next"]',
    hasSubNavElementQuerySelector: '.header-subnavigation-list:not(.d-none)',
};

window.cake.header = (options = defaultOptions) => {
    options = {...defaultOptions, ...options};
    //Select all Burger-Menus
    const headers = window.cake.utils.getElements (options.headerElements, options.headerQuerySelector);

    headers.forEach (header => {
        //Select all relevant Header-Items
        const burgerMenu = window.cake.utils.getElement (options.burgerMenuElement, options.burgerMenuQuerySelector, header);
        const navigation = window.cake.utils.getElement (options.navigationElement, options.navigationQuerySelector, header);

        //Do nothing, if required elements does not exist
        if (!burgerMenu || !navigation) {
            return;
        }

        //Init Tiny-Slider
        let sliderMainNav = null;
        let sliderSecNav = null;
        let defaultSliderSettings = {
            gutter: 0,
            fixedWidth: false,
            responsive: false,
            slideBy: 3,
            autoWidth: true,
        };

        const sliderMainNavButtonPrevious = window.cake.utils.getElement (options.sliderMainNavButtonPreviousElement, options.sliderMainNavButtonPreviousQuerySelector, header);
        const sliderMainNavButtonNext = window.cake.utils.getElement (options.sliderMainNavButtonNextElement, options.sliderMainNavButtonNextQuerySelector, header);

        const sliderSubNavButtonPrevious = window.cake.utils.getElement (options.sliderSubNavButtonPreviousElement, options.sliderSubNavButtonPreviousQuerySelector, header);
        const sliderSubNavButtonNext = window.cake.utils.getElement (options.sliderSubNavButtonNextElement, options.sliderSubNavButtonNextQuerySelector, header);
        const hasSubNavElement = !!header.querySelector (options.hasSubNavElementQuerySelector);

        //Header-Slider-Config
        const initSliders = () => {
            if (options.closeMobileMenuBreakpoint > window.innerWidth) {
                return;
            }

            //Initialize Slider
            if (sliderMainNav === null) {
                sliderMainNav = themeSlider ({
                    sliderElements: [ navigation ],
                    sliderListElements: [ header.querySelector ("*[data-identifier=\"header/navigation/main\"]") ],
                    sliderPreviousButtonElements: [ sliderMainNavButtonPrevious ],
                    sliderNextButtonElements: [ sliderMainNavButtonNext ],
                    tinySliderOptions: defaultSliderSettings,
                }) [0];
            }

            if (hasSubNavElement && sliderSecNav === null) {
                sliderSecNav = themeSlider ({
                    sliderElements: [ navigation ],
                    sliderListElements: [ header.querySelector (".header-subnavigation-list:not(.d-none)") ],
                    sliderPreviousButtonElements: [ sliderSubNavButtonPrevious ],
                    sliderNextButtonElements: [ sliderSubNavButtonNext ],
                    tinySliderOptions: defaultSliderSettings,
                }) [0];
            }
        }
        const deconstructSliders = () => {
            if (sliderMainNav) {
                sliderMainNav.terminate ();
                sliderMainNav = null;
            }
            if (sliderSecNav) {
                sliderSecNav.terminate ();
                sliderSecNav = null;
            }
        }
        initSliders ();


        //Method to dispatch event
        const toggleMobileMenu = (opened, breakpointChange = false) => {
            //Show or Hide the Buttons and Menus
            if (opened) {
                header.classList.add ("header-mobile-overlay");
                burgerMenu.classList.add ('is-active');

                deconstructSliders ();
            } else {
                header.classList.remove ("header-mobile-overlay");
                burgerMenu.classList.remove ('is-active');
            }

            // Dispatch/Trigger/Fire the event (before the change)
            header.dispatchEvent(new CustomEvent("open", {
                detail: {
                    opened,
                    "breakpoint-has-changed": breakpointChange,
                },
            }));

            if (!opened) {
                initSliders ();
            }

            //Set Aria-Attributes for Accessibility
            burgerMenu.setAttribute ('aria-pressed', opened);
            navigation.setAttribute ('aria-expanded', opened);
        };

        //Add Click-Listener to the BurgerMenu-Button
        burgerMenu.addEventListener ('click', (event) => {
            event.preventDefault ();
            toggleMobileMenu (burgerMenu.classList.contains ('is-active') === false);
        });

        //Add Event-Listener to close mobile-menu on resize, when on breakpoint >md
        window.resizeThrottled (() => {
            if (options.closeMobileMenuBreakpoint <= window.innerWidth) {
                    toggleMobileMenu (false, true);
            }
        }, 200);
    });
};

export default window.cake.header;
