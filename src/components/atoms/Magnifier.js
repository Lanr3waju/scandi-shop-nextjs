import Image from "next/image"
import { useState } from "react"

export default function ImageMagnifier({
  src,
  width,
  height,
  magnifierHeight = 150,
  magnifierWidth = 150,
  zoomLevel = 2.0,
}) {
  const [[x, y], setXY] = useState([0, 0])
  const [[imgWidth, imgHeight], setSize] = useState([0, 0])
  const [showMagnifier, setShowMagnifier] = useState(false)
  return (
    <div className="hidden md:block"
      onMouseEnter={(e) => {
        // update image size and turn-on magnifier
        const elem = e.currentTarget
        const { width, height } = elem.getBoundingClientRect()
        setSize([width, height])
        setShowMagnifier(true)
      }}
      onMouseLeave={() => {
        // close magnifier
        setShowMagnifier(false)
      }}
      onMouseMove={(e) => {
        // update cursor position
        const elem = e.currentTarget
        const { top, left } = elem.getBoundingClientRect()

        // calculate cursor position on the image
        const x = e.pageX - left - window.scrollX
        const y = e.pageY - top - window.scrollY
        setXY([x, y])
      }}
      style={{
        position: "relative",
        height: height,
        width: width,
      }}
    >
      <Image
        alt="Product Image"
        blurDataURL="/large-placeholder.png"
        className="relative -z-10 h-4/5 w-full object-contain"
        height={height}
        placeholder="blur"
        priority
        src={src}
        style={{ height: height, width: width }}
        width={width}
      />

      <div
        style={{
          display: showMagnifier ? "" : "none",
          position: "absolute",

          // prevent magnifier blocks the mousemove event of img
          pointerEvents: "none",
          // set size of magnifier
          height: `${magnifierHeight}px`,
          width: `${magnifierWidth}px`,
          // move element center to cursor pos
          top: `${y - magnifierHeight / 2}px`,
          left: `${x - magnifierWidth / 2}px`,
          opacity: "1", // reduce opacity so you can verify position
          border: "1px solid lightgray",
          borderRadius: 100,
          backgroundColor: "white",
          backgroundImage: `url('${src}')`,
          backgroundRepeat: "no-repeat",

          //calculate zoomed image size
          backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel
            }px`,

          //calculate position of zoomed image.
          backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
        }}
      ></div>
    </div>
  )
}
