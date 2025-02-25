import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
} from "framer-motion";

const IMGS = [
  "/Images/goa.jpg",
  "/Images/kashmir.2.jpg",
  "/Images/mumbai.jpg",
  "/Images/manali.jpg",
  "/Images/kerala.webp",
  "/Images/mizoram.jpg",
  "/Images/hyd.jpg",
  "/Images/ooty.jpg",
  "/Images/delhi.jpg",
];

const RollingGallery = ({ autoplay = true }) => {
  const [isScreenSizeSm, setIsScreenSizeSm] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 3D geometry
  const cylinderWidth = isScreenSizeSm ? 1400 : 2200;
  const faceCount = IMGS.length;
  const faceWidth = (cylinderWidth / faceCount) * 2.2;
  const radius = cylinderWidth / (1.2 * Math.PI);

  // Framer Motion
  const rotation = useMotionValue(0);
  const controls = useAnimation();

  // Convert rotation -> 3D transform
  const transform = useTransform(
    rotation,
    (val) => `rotate3d(0,1,0,${val}deg)`
  );

  const startInfiniteSpin = (startAngle) => {
    controls.start({
      rotateY: [startAngle, startAngle - 360],
      transition: {
        duration: 40,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  useEffect(() => {
    if (autoplay) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    } else {
      controls.stop();
    }
  }, [autoplay]);

  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      <h2 className="text-center text-3xl font-bold mt-16 mb-8">Discover India's Diverse Destinations</h2>
      <div className="flex h-full items-center justify-center [perspective:1000px] [transform-style:preserve-3d]">
        <motion.div
          drag="x"
          dragElastic={0}
          animate={controls}
          style={{
            transform: transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          className="flex min-h-[200px] items-center justify-center"
        >
          {IMGS.map((url, i) => (
            <div
              key={i}
              className="absolute flex h-fit items-center justify-center p-[8%]" // Padding remains 8%
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${(360 / faceCount) * i}deg) translateZ(${radius}px)`,
              }}
            >
              <img
                src={url}
                alt="gallery"
                className="pointer-events-none h-[200px] w-[400px] rounded-[20px] border-[4px] border-black object-cover transition-transform duration-300 ease-out hover:scale-110" // Move hover to img tag
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RollingGallery;
