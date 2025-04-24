import { useState, useEffect } from "react";
import axios from "axios";

const Banner = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const results = await axios.get(
        import.meta.env.VITE_API_BASE + `categories`
      );
      setCategories(results.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {/* Banner */}
      <div className="sec-banner bg0 p-t-80 p-b-50">
        <div className="container">
          <div className="row">
            {categories?.map((category) => {
              return (
                <div className="col-md-6 col-xl-4 p-b-30 m-lr-auto">
                  <div className="block1 wrap-pic-w">
                    <img src={category.image} alt={category.image} />
                    <a
                      href="product.html"
                      className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3"
                    >
                      <div className="block1-txt-child1 flex-col-l">
                        <span className="block1-name ltext-102 trans-04 p-b-8">
                          {category.category}
                        </span>
                        <span className="block1-info stext-102 trans-04">
                          {category.description}
                        </span>
                      </div>
                      <div className="block1-txt-child2 p-b-4 trans-05">
                        <div className="block1-link stext-101 cl0 trans-09">
                          Shop Now
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
