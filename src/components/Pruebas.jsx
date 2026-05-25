import React from 'react'
import { motion } from "motion/react"

export const Pruebas = () => {
    return (
        <motion.div
            animate={{ rotate: 360 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}


            style={{
                width: 100,
                height: 100,
                backgroundColor: "#e29530",
                borderRadius: 5,
            }}

        />

    )
}

