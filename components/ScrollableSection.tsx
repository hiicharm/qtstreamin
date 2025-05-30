
"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { redirect } from "next/navigation"

interface ScrollableSectionProps {
  title: string
  seeAllLink?: string
  children: React.ReactNode
}

export default function ScrollableSection({ title, children }: ScrollableSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  // Check if arrows should be shown
  const checkArrows = () => {
    if (!scrollContainerRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setShowLeftArrow(scrollLeft > 0)
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10) // 10px buffer
  }

  // Initialize and add event listeners
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const handleScroll = () => {
      checkArrows()
    }

    // Check arrows on mount and resize
    checkArrows()
    window.addEventListener("resize", checkArrows)
    scrollContainer.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("resize", checkArrows)
      scrollContainer.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Handle mouse wheel scrolling
  const handleWheel = (e: React.WheelEvent) => {
    if (!scrollContainerRef.current) return

    e.preventDefault()
    scrollContainerRef.current.scrollLeft += e.deltaY
  }

  // Handle scroll button clicks
  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return

    const { clientWidth } = scrollContainerRef.current
    const scrollAmount = clientWidth * 0.8 // Scroll 80% of the visible width

    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  // Handle scroll to end (See All)
  const scrollToEnd = () => {
    if (!scrollContainerRef.current) return
    const { scrollWidth, clientWidth } = scrollContainerRef.current
    if (scrollWidth <= clientWidth) {
      redirect('/movies')
      return
    }
    scrollContainerRef.current.scrollTo({
      left: scrollWidth - clientWidth,
      behavior: "smooth",
    })
  }

  // Mouse drag to scroll
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return

    setIsDragging(true)
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return

    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 2 // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  return (
    <div className="pl-5 pr-5 overflow-hidden relative group">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl text-mocha-text font-semibold">{title}</h2>
        {/*{seeAllLink ? (
          <Button className="text-mocha-overlay2 bg-mocha-base hover:text-mocha-blue hover:bg-mocha-base active:text-mocha-green" asChild>
            <Link href={seeAllLink} className="hover:text-mocha-blue transition-colors text-mocha-overlay2 active:text-mocha-green">See all</Link>
          </Button>
        ) : (
          <Button className="bg-mocha-base text-mocha-overlay2 hover:text-mocha-blue hover:bg-mocha-base active:text-mocha-green" onClick={scrollToEnd}>
            See all
          </Button>
        )}
        */}
        <Button className="bg-mocha-crust border-none focus:border-none" onClick={scrollToEnd}>See all </Button>
      </div>

      {/* Left scroll button */}
      {showLeftArrow && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-8 top-1/2 transform -translate-y-1/2 z-10 bg-mocha-crust/80 text-mocha-ovelay2 rounded-full h-10 w-10 -ml-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-mocha-blue active:bg-mocha-green"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      )}

      {/* Right scroll button */}
      {showRightArrow && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-8 top-1/2 transform -translate-y-1/2 z-10 bg-mocha-crust/80 text-mocha-overlay2 rounded-full h-10 w-10 -mr-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-mocha-blue active:bg-mocha-green"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      )}

      {/* Scrollable container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex gap-4">{children}</div>
      </div>
    </div>
  )
}
