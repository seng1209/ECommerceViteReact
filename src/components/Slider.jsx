import React, { useState, useEffect } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function Home() {
  const [sliders, setSliders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/sliders")
      .then((response) => response.json())
      .then((data) => setSliders(data))
      .catch((error) => console.error("Error fetching sliders:", error));
  }, []);

  return (
    <div>
      <section className="section-slide" style={{ marginTop: "100px" }}>
        <div className="wrap-slick1">
          <div className="slick1">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={50}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              loop={true}
            >
              {sliders.map((slider) => (
                <SwiperSlide key={slider.id}>
                  <div
                    className="item-slick1"
                    style={{
                      backgroundImage: `url(http://localhost:8000/${slider.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      width: "100%",
                      height: "800px",
                    }}
                  >
                    <div className="container h-full">
                      <div className="flex-col-l-m h-full p-t-100 p-b-30 respon5">
                        <div className="layer-slick1 animated">
                          <span className="ltext-101 cl2 respon2">
                            {slider.name}
                          </span>
                        </div>
                        <div className="layer-slick1 animated">
                          <h2 className="ltext-201 cl2 p-t-19 p-b-43 respon1">
                            {slider.description}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
