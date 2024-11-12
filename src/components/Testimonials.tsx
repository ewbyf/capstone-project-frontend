import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const CARD_SIZE_LG = 365;
const CARD_SIZE_SM = 290;

const BORDER_SIZE = 2;
const CORNER_CLIP = 50;
const CORNER_LINE_LEN = Math.sqrt(
  CORNER_CLIP * CORNER_CLIP + CORNER_CLIP * CORNER_CLIP
);

const ROTATE_DEG = 2.5;

const STAGGER = 15;
const CENTER_STAGGER = -65;

const SECTION_HEIGHT = 600;

export const Testimonials = () => {
  const [cardSize, setCardSize] = useState(CARD_SIZE_LG);

  const [testimonials, setTestimonials] = useState(TESTIMONIAL_DATA);

  const handleMove = (position: number) => {
    const copy = [...testimonials];

    if (position > 0) {
      for (let i = position; i > 0; i--) {
        const firstEl = copy.shift();

        if (!firstEl) return;

        copy.push({ ...firstEl, tempId: Math.random() });
      }
    } else {
      for (let i = position; i < 0; i++) {
        const lastEl = copy.pop();

        if (!lastEl) return;

        copy.unshift({ ...lastEl, tempId: Math.random() });
      }
    }

    setTestimonials(copy);
  };

  useEffect(() => {
    const { matches } = window.matchMedia("(min-width: 640px)");

    if (matches) {
      setCardSize(CARD_SIZE_LG);
    } else {
      setCardSize(CARD_SIZE_SM);
    }

    const handleSetCardSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");

      if (matches) {
        setCardSize(CARD_SIZE_LG);
      } else {
        setCardSize(CARD_SIZE_SM);
      }
    };

    window.addEventListener("resize", handleSetCardSize);

    return () => window.removeEventListener("resize", handleSetCardSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        height: SECTION_HEIGHT,
      }}
    >
      {testimonials.map((t, idx) => {
        let position = 0;

        if (testimonials.length % 2) {
          position = idx - (testimonials.length + 1) / 2;
        } else {
          position = idx - testimonials.length / 2;
        }

        return (
          <TestimonialCard
            key={t.tempId}
            testimonial={t}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-8">
        <button
          onClick={() => handleMove(-1)}
          className="grid h-14 w-14 place-content-center text-3xl transition-colors hover:bg-[#3C3C3C] hover:text-white"
        >
          <GoArrowLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className="grid h-14 w-14 place-content-center text-3xl transition-colors hover:bg-[#3C3C3C] hover:text-white"
        >
          <GoArrowRight />
        </button>
      </div>
    </div>
  );
};

interface TestimonialProps {
  position: number;
  testimonial: TestimonialType;
  handleMove: Function;
  cardSize: number;
}

const TestimonialCard = ({
  position,
  testimonial,
  handleMove,
  cardSize,
}: TestimonialProps) => {
  const isActive = position === 0;

  return (
    <motion.div
      initial={false}
      onClick={() => handleMove(position)}
      className={`
      absolute left-1/2 top-1/2 cursor-pointer border-[#3C3C3C] p-8 text-[#3C3C3C] transition-colors duration-500 ${
        isActive ? "z-10 bg-[#4F46E5]" : "z-0 bg-white"
      }
      `}
      style={{
        borderWidth: BORDER_SIZE,
        clipPath: `polygon(${CORNER_CLIP}px 0%, calc(100% - ${CORNER_CLIP}px) 0%, 100% ${CORNER_CLIP}px, 100% 100%, calc(100% - ${CORNER_CLIP}px) 100%, ${CORNER_CLIP}px 100%, 0 100%, 0 0)`,
      }}
      animate={{
        width: cardSize,
        height: cardSize,
        x: `calc(-50% + ${position * (cardSize / 1.5)}px)`,
        y: `calc(-50% + ${
          isActive ? CENTER_STAGGER : position % 2 ? STAGGER : -STAGGER
        }px)`,
        rotate: isActive ? 0 : position % 2 ? ROTATE_DEG : -ROTATE_DEG,
        boxShadow: isActive ? "0px 8px 0px 4px black" : "0px 0px 0px 0px black",
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-black object-cover"
        style={{
          right: -BORDER_SIZE,
          top: CORNER_CLIP - BORDER_SIZE,
          width: CORNER_LINE_LEN,
          height: BORDER_SIZE,
        }}
      />
      <img
        src={"/smile_img.jpg"}
        alt={`:)`}
        className="mb-4 h-14 w-12 bg-neutral-600 object-cover object-top"
        style={{
          boxShadow: "3px 3px 0px white",
        }}
      />
      <h3
        className={`text-base sm:text-xl ${
          isActive ? "text-white" : "text-black"
        }`}
      >
        "{testimonial.testimonial}"
      </h3>
      <p
        className={`absolute bottom-8 left-8 right-8 mt-2 text-sm italic ${
          isActive ? "text-indigo-200" : "text-neutral-700"
        }`}
      >
        - {testimonial.by}
      </p>
    </motion.div>
  );
};

type TestimonialType = {
  tempId: number;
  testimonial: string;
  by: string;
  imgSrc: string;
};

const TESTIMONIAL_DATA: TestimonialType[] = [
  {
    tempId: 0,
    testimonial:
      "Helped increase my team's efficiency by over 50 percent!",
    by: "Product Owner",
    imgSrc: "smile_img.jpg",
  },
  {
    tempId: 1,
    testimonial:
      "Solved misunderstandings between developers and the planning team!",
    by: "CEO",
    imgSrc: "smile_img.jpg",
  },
  {
    tempId: 2,
    testimonial:
      "Saved me so much time in planning and made sure developers remained on track!",
    by: "Scrum Master",
    imgSrc: "smile_img.jpg",
  },
  {
    tempId: 3,
    testimonial:
      "Finally no more 3 hour meetings to keep everyone on the same page!",
    by: "Developer",
    imgSrc: "smile_img.jpg",
  },
  {
    tempId: 4,
    testimonial: "Makes it so easy to see when functionality is ready for testing!",
    by: "Tester",
    imgSrc: "smile_img.jpg",
  },
  {
    tempId: 5,
    testimonial:
      "I have never seen better results from the project team!",
    by: "CEO",
    imgSrc: "smile_img.jpg",
  },
  {
    tempId: 6,
    testimonial:
      "We received our software almost 2 months early after the development team started using this product!",
    by: "Customer",
    imgSrc: "smile_img.jpg",
  },
  {
    tempId: 7,
    testimonial:
      "A great way to communicate with peers and collaborate when new features are in progress!",
    by: "Developer",
    imgSrc: "smile_img.jpg",
  },
  {
    tempId: 8,
    testimonial: "Employee retention has gone up as a result of how much the team enjoys this product's amazing features!",
    by: "HR Manager",
    imgSrc: "smile_img.jpg",
  },
  {
    tempId: 9,
    testimonial: "Game changing for completing software with a tight deadline!",
    by: "Product Owner",
    imgSrc: "smile_img.jpg",
  },
  {
    tempId: 10,
    testimonial:
      "Easy to navigate and assign tasks to the correct team members!",
    by: "Scrum Master",
    imgSrc: "smile_img.jpg",
  },
  {
    tempId: 11,
    testimonial:
      "Easy for everyone to use, even new interns understand the process after only 10 minutes!",
    by: "HR Manager",
    imgSrc: "smile_img.jpg",
  },
];