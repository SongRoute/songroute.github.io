import { useEffect, useRef } from "react"
import snowflakeUrl from "../../icons/snowflake.svg"

const X_SPEED = 0.2
const X_SPEED_VARIANCE = 0.3

const Y_SPEED = 0.8
const Y_SPEED_VARIANCE = 0.6

const FLIP_SPEED_VARIANCE = 0.01

// Snowflake class
class Snowflake {
  x: number
  y: number
  w: number = 0
  h: number = 0
  opacity: number = 0
  flip: number = 0
  xSpeed: number = 0
  ySpeed: number = 0
  flipSpeed: number = 0

  constructor(
    private canvas: HTMLCanvasElement,
    private ctx: CanvasRenderingContext2D,
    private snowflakeImg: HTMLImageElement,
  ) {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height * 2 - canvas.height

    this.initialize()
  }

  initialize() {
    this.w = 8 + Math.random() * 16
    this.h = this.w // 눈송이는 정사각형
    this.opacity = 0.4 + Math.random() * 0.6
    this.flip = Math.random()

    this.xSpeed = X_SPEED + Math.random() * X_SPEED_VARIANCE
    this.ySpeed = Y_SPEED + Math.random() * Y_SPEED_VARIANCE
    this.flipSpeed = Math.random() * FLIP_SPEED_VARIANCE
  }

  draw() {
    if (this.y > this.canvas.height || this.x > this.canvas.width) {
      this.initialize()

      const rand = Math.random() * (this.canvas.width + this.canvas.height)
      if (rand > this.canvas.width) {
        this.x = 0
        this.y = rand - this.canvas.width
      } else {
        this.x = rand
        this.y = 0
      }
    }
    this.ctx.globalAlpha = this.opacity
    this.ctx.save()
    this.ctx.translate(this.x + this.w/2, this.y + this.h/2)
    this.ctx.rotate(this.flip)
    this.ctx.drawImage(
      this.snowflakeImg,
      -this.w/2,
      -this.h/2,
      this.w,
      this.h,
    )
    this.ctx.restore()
  }

  animate() {
    this.x += this.xSpeed
    this.y += this.ySpeed
    this.flip += this.flipSpeed
    this.draw()
  }
}

export const BGEffect = () => {
  const ref = useRef<HTMLCanvasElement>({} as HTMLCanvasElement)

  const snowflakesRef = useRef<Snowflake[]>([])

  const resizeTimeoutRef = useRef(0)
  const animationFrameIdRef = useRef(0)

  useEffect(() => {
    const canvas = ref.current

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

    const snowflakeImg = new Image()
    snowflakeImg.src = snowflakeUrl

    const getSnowflakeNum = () => {
      return Math.floor((window.innerWidth * window.innerHeight) / 20000)
    }

    const initializeSnowflakes = () => {
      const count = getSnowflakeNum()
      const snowflakes = []
      for (let i = 0; i < count; i++) {
        snowflakes.push(new Snowflake(canvas, ctx, snowflakeImg))
      }
      snowflakesRef.current = snowflakes
    }

    initializeSnowflakes()

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      snowflakesRef.current.forEach((snowflake) => snowflake.animate())
      animationFrameIdRef.current = requestAnimationFrame(render)
    }

    render()

    const onResize = () => {
      clearTimeout(resizeTimeoutRef.current)
      resizeTimeoutRef.current = window.setTimeout(() => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        const newSnowflakeNum = getSnowflakeNum()
        if (newSnowflakeNum > snowflakesRef.current.length) {
          for (let i = snowflakesRef.current.length; i < newSnowflakeNum; i++) {
            snowflakesRef.current.push(new Snowflake(canvas, ctx, snowflakeImg))
          }
        } else if (newSnowflakeNum < snowflakesRef.current.length) {
          snowflakesRef.current.splice(newSnowflakeNum)
        }
      }, 100)
    }

    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("resize", onResize)
      cancelAnimationFrame(animationFrameIdRef.current)
    }
  }, [])

  return (
    <div className="bg-effect">
      <canvas ref={ref} />
    </div>
  )
}
