"use client";
import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import review1 from "../../assets/r1.png";
import review2 from "../../assets/r2.png";
import review3 from "../../assets/r3.png";

const fallbackImages = [review1, review2, review3];

const OurStory = () => {
  const scrollRef = useRef(null);
  const [reviewData, setReviewData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (data && data.length > 0) {
          setReviewData(
            data.map((r, i) => ({
              name: r.name,
              role: r.role,
              text: r.text,
              rating: r.rating,
              image: r.imageUrl
                ? { src: r.imageUrl }
                : fallbackImages[i % fallbackImages.length],
            }))
          );
        } else {
          setReviewData(getDefaults());
        }
        setLoaded(true);
      })
      .catch(() => {
        setReviewData(getDefaults());
        setLoaded(true);
      });
  }, []);

  const getDefaults = () => [
    { name: "Eldho J.", role: "Satisfied Contractor", text: "Great experience with Autobon! The process was smooth, transparent, and hassle-free.", image: review1, rating: 5 },
    { name: "Teena", role: "Satisfied Contractor", text: "Autobon offers a smooth and trustworthy car buying experience. Everything was transparent.", image: review2, rating: 5 },
    { name: "Noah", role: "Satisfied Contractor", text: "Autobon made buying a car simple and stress-free. Transparent process and very professional team.", image: review3, rating: 5 },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth / (window.innerWidth < 768 ? 1.2 : 2);
      const scrollTo = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  if (!loaded && reviewData.length === 0) return null;

  return (
    <>
      {/* "Customer Experience Like No Other" heading */}
      <section className="bg-background pt-8 lg:pt-16 pb-2 px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-[28px] lg:text-[40px] font-bold text-[#0F0202] leading-tight tracking-tight">
            Customer Experience Like No Other
          </h2>
          <p className="text-[#505050] text-[15px] mt-3 max-w-[500px] mx-auto">
            Shopping for a car has never been easier
          </p>
        </div>
      </section>

      {/* Review Cards Only — no extra heading */}
      <section className="w-full bg-background py-[20px] lg:py-[30px] overflow-hidden">
        <div className="w-full px-5 lg:px-0 lg:pl-[calc((100vw-1200px)/2)]">
          <div className="relative w-full group">
            <button
              onClick={() => scroll("left")}
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 lg:w-14 lg:h-14 bg-white/90 backdrop-blur shadow-xl rounded-full items-center justify-center hover:bg-primary hover:text-white transition-all text-gray-800"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="hidden md:flex absolute right-10 top-1/2 -translate-y-1/2 z-30 w-12 h-12 lg:w-14 lg:h-14 bg-white/90 backdrop-blur shadow-xl rounded-full items-center justify-center hover:bg-primary hover:text-white transition-all text-gray-800"
            >
              <ChevronRight size={28} />
            </button>

            <div
              ref={scrollRef}
              className="flex gap-4 lg:gap-6 overflow-x-auto pb-10 snap-x snap-mandatory scrollbar-none"
              style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
            >
              <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>

              {reviewData.map((review, index) => (
                <div
                  key={index}
                  className="min-w-[280px] md:min-w-[420px] bg-white rounded-[16px] shadow-xl border border-[#DFDFDF] relative mt-8 snap-start"
                >
                  <div className="absolute -top-5 left-[20px] lg:left-[30px] bg-primary p-3 lg:p-4 rounded-full shadow-lg z-20">
                    <Quote size={20} className="text-white fill-white" />
                  </div>

                  <div className="p-3">
                    <p className="text-[#000000B2] text-[13px] lg:text-[14px] leading-relaxed mb-5 mt-7 line-clamp-3 h-[60px] lg:h-[66px]">
                      {review.text}
                    </p>

                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-black text-[14px] lg:text-[16px] leading-none mb-1">{review.name}</h4>
                          <p className="text-gray-400 text-[12px] lg:text-[13px]">{review.role}</p>
                        </div>
                      </div>
                      <div className="w-6 h-6 lg:w-[30px] lg:h-[30px]">
                        <svg viewBox="0 0 24 24" className="w-full h-full">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                      </div>
                    </div>

                    <div className="relative w-full h-[180px] lg:h-[220px] rounded-[16px] overflow-hidden">
                      <img
                        src={review.image?.src || (typeof review.image === "string" ? review.image : "")}
                        alt="Customer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-3 left-3 flex gap-1 bg-black/20 backdrop-blur-sm p-1.5 rounded-lg">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} viewBox="0 0 24 24" className={`w-3.5 h-3.5 ${i < review.rating ? "text-white fill-white" : "text-gray-400 fill-gray-400"}`}>
                            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="min-w-[40px] lg:min-w-[calc((100vw-1200px)/2)]" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurStory;
