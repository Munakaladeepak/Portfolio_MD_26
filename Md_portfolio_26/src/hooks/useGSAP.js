import { useEffect } from 'react'
import { gsap } from 'gsap'

/**
 * Custom lightweight useGSAP hook to replicate @gsap/react functionality
 * without requiring the @gsap/react package.
 */
export function useGSAP(callback, config = {}) {
  // Parse options: config can be a dependency array or an options object
  let scope = undefined
  let dependencies = []

  if (config && typeof config === 'object' && !Array.isArray(config)) {
    scope = config.scope
    dependencies = config.dependencies || []
  } else if (Array.isArray(config)) {
    dependencies = config
  }

  useEffect(() => {
    // gsap.context executes the callback and scopes any selector calls within scope.current
    const ctx = gsap.context(callback, scope)
    return () => ctx.revert()
  }, dependencies)
}
