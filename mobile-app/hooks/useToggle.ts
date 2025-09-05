import { useCallback, useState } from 'react'

export default function useToggle(initialState: boolean) {
    const [state, setstate] = useState<boolean>(initialState)
    const toggle = useCallback((value?: boolean) => setstate((prev) => value || !prev), [])
    return [state, toggle] as const
}