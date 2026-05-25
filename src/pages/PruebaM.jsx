import React from 'react'
import { motion } from "motion/react"


export const PruebaM = () => {
  return (
    
        <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
              animate={{
             scale: 2,
             transition: { duration: 2 },
  }}
            style={{
                width: 100,
                height: 100,
                backgroundColor: "#98c379",
                borderRadius: 10,
            }}
        />

    

  )


  
}

