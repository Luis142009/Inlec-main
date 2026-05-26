import React from 'react'
import { motion } from "motion/react"

export const Pruebaluis = () => {
  return  ( 
     <motion.div drag 
     
      
        style={{
        width: 300,
        height: 300,
        backgroundColor: "#145de6",
        borderRadius: 5,
     }}
      animate={{rotate: 360}}
        transition={{duration: 5}}
        whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
   

        

        
     />
  )
}
 