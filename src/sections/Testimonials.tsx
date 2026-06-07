import React from 'react';
import { TESTIMONIALS } from '../data/portfolioData';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useUIStore } from '../store/useStore';

// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export const Testimonials: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { setActiveSection } = useUIStore();

  const { ref: sectionRef } = useInView({
    threshold: 0.3,
    onChange: (inView) => {
      if (inView) setActiveSection('testimonials');
    },
  });

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative z-10 py-24 px-6 md:px-12 bg-transparent overflow-hidden"
    >
      {/* Title */}
      <div
        ref={ref}
        className="max-w-5xl mx-auto flex flex-col items-center text-center gap-4 mb-16"
      >
        <motion.h2
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={inView ? { clipPath: 'inset(0 0 0 0)' } : {}}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="font-syne font-extrabold text-3xl sm:text-4xl text-white tracking-tight uppercase"
        >
          My Client's Stories
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-body text-base text-slate-400 max-w-2xl leading-relaxed"
        >
          Real feedback from people I've built with.
        </motion.p>
      </div>

      {/* Swiper Slider Wrapper */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-7xl mx-auto px-2"
      >
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-16"
        >
          {TESTIMONIALS.map((testimonial) => (
            <SwiperSlide key={testimonial.id} className="h-full">
              <div className="glass-card p-6 sm:p-8 rounded-2xl border border-[#7c3aed]/15 flex flex-col gap-6 justify-between h-full hover:border-[#7c3aed]/40 transition-colors duration-300">
                {/* Top Row - Review Quote */}
                <div className="flex flex-col gap-4">
                  {/* Stars */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  {/* Quote */}
                  <p className="font-body text-slate-300 text-sm sm:text-base leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                </div>

                {/* Bottom Row - Avatar / Client info */}
                <div className="flex items-center gap-4 border-t border-[#7c3aed]/10 pt-4">
                  {/* Avatar Placeholder */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#7c3aed] to-[#06b6d4] p-0.5 shadow-md">
                    <div className="w-full h-full rounded-[10px] bg-[#06060f] flex items-center justify-center font-syne font-bold text-sm text-[#a855f7]">
                      {testimonial.avatarInitials}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex flex-col">
                    <span className="font-syne font-bold text-sm text-white">
                      {testimonial.name}
                    </span>
                    <span className="font-body text-xs text-slate-400">
                      {testimonial.company}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
};
