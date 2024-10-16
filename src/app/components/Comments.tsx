"use client";
import { motion, useAnimation } from "framer-motion";
import Comment from "./Comment";
import { useEffect, useRef, useState } from "react";

const commentsData = [
  {
    customerName: "Jonthan",
    imgSrc: "/users/user-1.png",
    text1:
      "The case feels durable and I even got a compliment on the design. Had the case for two and a half months now and",
    hightLightedText: "the image is super clear",
    text2:
      ", on the case I had before, the image started fading into yellow-ish color after a couple weeks. Love it.",
  },
  {
    customerName: "Josh",
    imgSrc: "/users/user-4.jpg",
    delay: 0.3,
    text1:
      "I usually keep my phone together with my keys in my pocket and that led to some pretty heavy scratchmarks on all of my last phone cases. This one, besides a barely noticeable scratch on the corner,",
    hightLightedText: "looks brand new after about half a year",
    text2: ". I dig it.",
  },
  {
    customerName: "Jimmy",
    imgSrc: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
    delay: 0.3,
    text1:
      "This case is incredible! I've accidentally dropped my phone a few times, and there isn't a single scratch. Not only does it offer amazing protection,",
    hightLightedText: "the design is stylish and chic",
    text2:
      ". I've had it for months, and it still looks as good as the day I bought it.",
  },
  {
    customerName: "Tina",
    imgSrc: "/users/user-2.png",
    delay: 0.3,
    text1:
      "I was hesitant to purchase, but I'm so glad I did! This case survived a beach trip with all the sand and sun, and it's still flawless. I love how",
    hightLightedText: "easy it is to clean",
    text2:
      ", and the colors are still vibrant after several months of use. Highly recommended!",
  },
];



const Comments = () => {
  const [width, setWidth] = useState(0);
  const [isMounted, setIsMounted] = useState(false); // Track component mount status
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();

  // Function for auto-scrolling
  const startAutoScroll = async () => {
    if (!isMounted || width <= 0) return; // Ensure component is mounted and width is calculated

    try {
      await controls.start({
        x: -width,
        transition: {
          ease: "linear",
          duration: 15,
        },
      });

      await controls.start({
        x: 0,
        transition: {
          ease: "easeInOut",
          duration: 2,
        },
      });

      startAutoScroll(); // Loop the animation
    } catch (error) {
      console.error("Animation Error:", error);
    }
  };

  // Calculate carousel width after component mounts
  useEffect(() => {
    if (carouselRef.current) {
      const scrollWidth = carouselRef.current.scrollWidth;
      const offsetWidth = carouselRef.current.offsetWidth;
      setWidth(scrollWidth - offsetWidth); // Set width after component is mounted
    }

    setIsMounted(true); // Mark as mounted
  }, []);

  // Trigger auto-scroll only when width is calculated and component is mounted
  useEffect(() => {
    if (isMounted && width > 0) {
      startAutoScroll(); // Start auto-scroll only after everything is ready
    }
  }, [isMounted, width]);

  return (
    <motion.div ref={carouselRef} className="overflow-hidden w-full flex items-center">
      <motion.div
        drag="x"
        animate={controls}
        dragConstraints={{ right: 0, left: -width - 20 }}
        className="flex items-center"
        onDragEnd={() => startAutoScroll()} // Restart scroll on drag end
      >
        {commentsData.map((comment, index) => (
          <motion.div key={index} className="lg:min-w-[47%] min-w-[84%] mx-6">
            <Comment
              customerName={comment.customerName}
              imgSrc={comment.imgSrc}
              text1={comment.text1}
              hightLightedText={comment.hightLightedText}
              text2={comment.text2}
              delay={comment.delay}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Comments;
