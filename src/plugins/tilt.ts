import type { DirectiveBinding } from 'vue'

type TiltOptions = {
  max?: number
  scale?: number
  shadow?: number
}

function setTransform(
  el: HTMLElement,
  rotateX: number,
  rotateY: number,
  scale: number,
  shadow: number,
) {
  el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`
  el.style.boxShadow = `${-rotateY * shadow}px ${rotateX * shadow}px ${Math.abs(rotateX) + Math.abs(rotateY)}px rgba(2,41,89,0.15)`
  el.style.willChange = 'transform'
  el.style.transition = 'transform 120ms ease-out, box-shadow 120ms ease-out'
}

function resetTransform(el: HTMLElement) {
  el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)'
  el.style.boxShadow = ''
}

export const tiltDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding<TiltOptions | undefined>) {
    const opts: Required<TiltOptions> = {
      max: binding.value?.max ?? 10,
      scale: binding.value?.scale ?? 1,
      shadow: binding.value?.shadow ?? 0.6,
    }

    function onMove(clientX: number, clientY: number) {
      const rect = el.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top
      const halfW = rect.width / 2
      const halfH = rect.height / 2
      const rotateY = ((x - halfW) / halfW) * opts.max
      const rotateX = -((y - halfH) / halfH) * opts.max
      setTransform(el, rotateX, rotateY, opts.scale, opts.shadow)
    }

    const onMouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY)
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0]
      if (t) onMove(t.clientX, t.clientY)
    }
    const onLeave = () => resetTransform(el)

    el.style.transformStyle = 'preserve-3d'
    el.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseleave', onLeave)
    el.addEventListener('touchmove', onTouchMove)
    el.addEventListener('touchend', onLeave)

    ;(el as any).__tiltCleanup = () => {
      el.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mouseleave', onLeave)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onLeave)
    }
  },
  unmounted(el: HTMLElement) {
    const cleanup = (el as any).__tiltCleanup as (() => void) | undefined
    cleanup?.()
  },
}


