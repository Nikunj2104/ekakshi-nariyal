import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";

const Loader = () => {
  const navbarHeight = 64;
  const text = "THEVEDICWELNESS";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: `calc(100vh - ${navbarHeight}px)`,
        backgroundColor: "background.secondary",
        padding: "2rem",
        position: "relative",
      }}
    >
      <motion.div
        style={{
          display: "flex",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Map over each letter and animate */}
        {text.split("").map((letter, index) => (
          <motion.div
            key={index}
            style={{
              position: "relative",
              zIndex: 1,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                delay: index * 0.15,
                duration: 2.5,
                repeat: Infinity,
              },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "primary.main",
                fontSize: {
                  sm: "2rem",
                  xs: "0.9rem",
                },
                letterSpacing: {
                  sm: "1.1rem",
                  xs: "0.5rem",
                },
              }}
            >
              {letter}
            </Typography>
          </motion.div>
        ))}
      </motion.div>

      {/* Text at bottom-right */}
      <Typography
        variant="body2"
        sx={{
          position: "absolute",
          bottom: "1rem",
          right: "2rem",
          color: "text.secondary",
          fontSize: "0.8rem",
        }}
      >
        Give your eyes a break, it's just a Loader
      </Typography>
    </Box>
  );
};

export default Loader;
