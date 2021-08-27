export const slickSettings = {
   dots: false,
   infinite: false,
   speed: 300,
   slidesToShow: 4,
   slidesToScroll: 4,
   responsive: [
      {
         breakpoint: 1200,
         settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
         },
      },
      {
         breakpoint: 992,
         settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
         },
      },
      {
         breakpoint: 768,
         settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
         },
      },
      {
         breakpoint: 576,
         settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
         },
      },
   ],
};
