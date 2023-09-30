import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="flex mx-auto mt-16 mb-8 w-8 tablet:w-12 h-8 tablet:h-12">
      <motion.div
        className="w-8 tablet:w-12 h-8 tablet:h-12 border-t-blue-light border-4 tablet:border-[6px] rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
      ></motion.div>
    </div>
  );
};

export default LoadingSpinner;
