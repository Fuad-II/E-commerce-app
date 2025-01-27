import { Menu } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

export const Header = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isHorizontal, setIsHorizontal] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 50)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        "bg-white/80 backdrop-blur-sm border-b",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsHorizontal(!isHorizontal)}
              className="relative"
            >
              <Menu className={cn(
                "h-5 w-5 transition-all",
                isHorizontal ? "rotate-90" : "rotate-0"
              )} />
            </Button>
            <span className="font-semibold text-lg">Premium Store</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium hover:text-primary">Products</a>
            <a href="#" className="text-sm font-medium hover:text-primary">Categories</a>
            <a href="#" className="text-sm font-medium hover:text-primary">About</a>
          </nav>
        </div>
      </div>
    </header>
  )
}