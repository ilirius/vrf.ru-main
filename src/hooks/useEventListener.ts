import { DependencyList, useEffect } from 'react'

const useEventListener = <K extends keyof DocumentEventMap>(
  event: K,
  callback: (event: DocumentEventMap[K]) => void,
  deps?: DependencyList
) => {
  useEffect(() => {
    document.addEventListener(event, callback)
    return () => document.removeEventListener(event, callback)
  }, [deps])
}

export default useEventListener
