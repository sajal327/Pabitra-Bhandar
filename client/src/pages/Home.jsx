import React, { useEffect, useState, useCallback } from "react";
import HeroSection from "../pages/HeroSection";
import { useSelector } from "react-redux";
import { valideURLConvert } from "../utils/valideURLConvert";
import { Link, useNavigate } from "react-router-dom";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import Gallery from "./Gallery";

const Home = () => {
  const [scrollToTop, setScrollToTop] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory);
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const navigate = useNavigate();

  const handleRedirectProductListpage = (id, cat) => {
    console.log(id, cat);
    const subcategory = subCategoryData.find((sub) => {
      const filterData = sub.category.some((c) => {
        return c._id == id;
      });

      return filterData ? true : null;
    });
    const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(
      subcategory.name
    )}-${subcategory._id}`;

    navigate(url);
    console.log(url);
  };
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setShowButton(scrollY > 100);
    setScrollToTop(scrollY > 200);
  }, []);

  const scrollHandler = () => {
    window.scrollTo({
      top: scrollToTop ? 0 : document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section className="bg-white">
      <div className="mx-auto md:my-10">
        <HeroSection />
        {/* <div className={`w-full h-full min-h-48 bg-blue-100 rounded ${!banner && "animate-pulse my-2" } `}>
              <img
                src={banner}
                className='w-full h-full hidden lg:block'
                alt='banner' 
              />
              <img
                src={bannerMobile}
                className='w-full h-full lg:hidden'
                alt='banner' 
              />
          </div> */}
      </div>

      {/* <div className="container mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 mb-10 gap-2">
        {loadingCategory
          ? new Array(12).fill(null).map((c, index) => {
              return (
                <div
                  key={index + "loadingcategory"}
                  className="bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse"
                >
                  <div className="bg-blue-100 min-h-24 rounded"></div>
                  <div className="bg-blue-100 h-8 rounded"></div>
                </div>
              );
            })
          : categoryData.map((cat, index) => {
              return (
                <div
                  key={cat._id + "displayCategory"}
                  className="w-full h-full"
                  onClick={() =>
                    handleRedirectProductListpage(cat._id, cat.name)
                  }
                >
                  <div className="bg-white p-2 rounded shadow hover:shadow-md transition-all items-center  w-[100px] md:w-[120px]">
                    <div className="h-24 w-full flex-col items-center justify-center">
                      <img src={cat.image} className="h-full object-contain" />
                      <p className="text-center md:text-sm text-xs font-medium md:mt-6 mt-3">
                        {cat.name}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
      </div> */}

      <div className="container mx-auto px-4 my-2 mb-10">
        <div className="flex flex-wrap gap-3">
          {loadingCategory
            ? new Array(12).fill(null).map((c, index) => {
                return (
                  <div
                    key={index + "loadingcategory"}
                    className="bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse w-[100px] md:w-[120px]"
                  >
                    <div className="bg-blue-100 min-h-24 rounded"></div>
                    <div className="bg-blue-100 h-8 rounded"></div>
                  </div>
                );
              })
            : categoryData.map((cat) => {
                return (
                  <div
                    key={cat._id + "displayCategory"}
                    className="cursor-pointer"
                    onClick={() =>
                      handleRedirectProductListpage(cat._id, cat.name)
                    }
                  >
                    <div className="bg-white p-2 rounded shadow hover:shadow-lg transition-all flex flex-col items-center w-[100px] md:w-[120px]">
                      <div className="h-24 w-full flex items-center justify-center">
                        <img
                          src={cat.image}
                          className="h-full object-contain"
                          alt={cat.name}
                        />
                      </div>
                      <p className="text-center text-sm font-medium mt-3 break-words">
                        {cat.name}
                      </p>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>

      {/***display category product */}
      {categoryData?.map((c, index) => {
        return (
          <CategoryWiseProductDisplay
            key={c?._id + "CategorywiseProduct"}
            id={c?._id}
            name={c?.name}
          />
        );
      })}
      {showButton && (
        <div
          className="hidden md:flex fixed bottom-5 right-5 z-50 cursor-pointer bg-gray-600 hover:bg-gray-700 text-white text-2xl w-12 h-12 items-center justify-center rounded-full shadow-lg transition-all duration-300 "
          onClick={scrollHandler}
        >
          {scrollToTop ? "↑" : "↓"}
        </div>
      )}
      <Gallery />
    </section>
  );
};

export default Home;
