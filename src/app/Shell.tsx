import { Outlet, useNavigate } from 'react-router'
import { Stage } from './Stage'
import { FocusProvider, useBack } from '../focus/FocusEngine'
import { SettingsProvider } from '../state/settings'
import { Hint } from '../components/Hint'

/** Back for every screen: pop history, or go Home when there is none. */
function BackToHistory() {
  const navigate = useNavigate()
  useBack(() => {
    const idx = (window.history.state as { idx?: number } | null)?.idx ?? 0
    if (idx > 0) navigate(-1)
    else navigate('/')
  })
  return null
}

export function Shell() {
  return (
    <SettingsProvider>
      <FocusProvider>
        <Stage>
          <BackToHistory />
          <Outlet />
          <Hint />
        </Stage>
      </FocusProvider>
    </SettingsProvider>
  )
}
