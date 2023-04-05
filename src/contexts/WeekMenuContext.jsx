import { createContext, useState } from 'react'

export const WeekMenuContext = createContext({})

export function WeekMenuContextProvider ({ children }) {
  const [weekMenu, setWeekMenu] = useState([])

  return (
    <WeekMenuContext.Provider value={{ weekMenu, setWeekMenu }}>
      {children}
    </WeekMenuContext.Provider>
  )
}
