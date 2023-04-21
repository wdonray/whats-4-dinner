import { useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints({
  tablet: 768,
  laptop: 1024,
  desktop: 1280
})

const mobile = breakpoints.smaller('tablet')
const tablet = breakpoints.greater('tablet')
const desktop = breakpoints.greater('desktop')

export default function useBreakpoint() {
  return { mobile, tablet, desktop }
}
