import {useState, useEffect} from 'react'

const useDebounce = (input: string, delay: number) => {
  const [value, setValue] = useState(input)

  useEffect(() => {
    const timer = setTimeout(() => setValue(input), delay)
    return () => clearTimeout(timer)
  }, [input, delay])

  return value
}

export default useDebounce