import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
}

function Char({
  char,
  range,
  progress,
}: {
  char: string
  range: [number, number]
  progress: MotionValue<number>
}) {
  const opacity = useTransform(progress, range, [0.2, 1])
  return (
    <span className="relative inline-block">
      <span className="opacity-0">{char}</span>
      <motion.span style={{ opacity }} className="absolute left-0 top-0">
        {char}
      </motion.span>
    </span>
  )
}

export default function AnimatedText({ text, className = '' }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  const words = text.split(' ')
  const total = text.length
  let charIndex = 0

  return (
    <p ref={ref} className={className}>
      {words.map((word, wi) => {
        const wordChars = word.split('')
        const node = (
          <span key={wi} className="inline-block whitespace-nowrap">
            {wordChars.map((char, ci) => {
              const start = charIndex / total
              charIndex += 1
              const end = charIndex / total
              return (
                <Char
                  key={ci}
                  char={char}
                  range={[start, end]}
                  progress={scrollYProgress}
                />
              )
            })}
          </span>
        )
        // account for the space between words in the index budget
        charIndex += 1
        return (
          <span key={`w-${wi}`}>
            {node}
            {wi < words.length - 1 ? ' ' : ''}
          </span>
        )
      })}
    </p>
  )
}
