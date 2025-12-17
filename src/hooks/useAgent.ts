import { useState, useEffect } from "react"


export default function useAgent() {
  const [isFirefox, setIsFirefox] = useState(false)

  useEffect(() => {
    const navigatorIsFirefox = navigator.userAgent.toLowerCase().includes("firefox")
    setIsFirefox(navigatorIsFirefox)
  }, [])

  return { isFirefox }
}