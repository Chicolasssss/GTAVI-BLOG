"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export default function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Check if the user has already accepted or declined
    const consent = localStorage.getItem("leonida_cookie_consent")
    if (!consent) {
      setShow(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("leonida_cookie_consent", "accepted")
    setShow(false)
  }

  const handleDecline = () => {
    localStorage.setItem("leonida_cookie_consent", "declined")
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 pointer-events-none flex justify-center"
        >
          <div className="bg-[#121216]/90 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl max-w-4xl w-full pointer-events-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-white font-bold mb-2">We value your privacy</h3>
              <p className="text-white/60 text-sm">
                We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read our{" "}
                <Link href="/privacy" className="text-[#00ffff] hover:underline">
                  Privacy Policy
                </Link>{" "}
                for more information.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
              <button
                onClick={handleDecline}
                className="flex-1 md:flex-none px-6 py-2.5 rounded-xl border border-white/10 text-white/70 font-medium hover:bg-white/5 transition-colors text-sm"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#ff007f] to-[#00ffff] text-white font-bold hover:shadow-lg hover:shadow-[#ff007f]/20 transition-all text-sm"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
