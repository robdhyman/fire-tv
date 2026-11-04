import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { MotionConfig } from 'motion/react'
import { Stage } from './Stage'
import { Screens } from './Screens'
import { FocusProvider, useBack } from '../focus/FocusEngine'
import { SettingsProvider, useSettings, WatchProvider } from '../state/settings'
import { Hint } from '../components/Hint'
import { RemoteOverlay } from '../remote/Remote'
import { useGlobalKeys } from '../remote/keys'
import { cssVars } from '../motion/tokens'
import { useReduced } from '../motion/useMotion'
import { DeviceProvider, useDevice } from './device'
import { MobileApp } from '../mobile/MobileShell'
import { NavSounds } from '../sound/NavSounds'

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

/** Reduced motion for the whole app: motion's own switch plus the CSS duration tokens. */
function MotionRoot({ children }: { children: React.ReactNode }) {
  const reduced = useReduced()
  useEffect(() => {
    for (const [k, v] of Object.entries(cssVars(reduced))) document.documentElement.style.setProperty(k, v)
  }, [reduced])
  return <MotionConfig reducedMotion={reduced ? 'always' : 'never'}>{children}</MotionConfig>
}

function App() {
  const navigate = useNavigate()
  const { settings } = useSettings()
  const [hint, setHint] = useState(!settings.hintSeen)
  const goHome = useCallback(() => navigate('/'), [navigate])
  const showHint = useCallback(() => setHint(true), [])
  useGlobalKeys(goHome, showHint)
  return (
    <>
      <Stage>
        <BackToHistory />
        <Screens />
        <Hint shown={hint} setShown={setHint} />
      </Stage>
      <RemoteOverlay />
      <NavSounds />
    </>
  )
}

/** The TV stage with its focus engine, or the touch layout (issue #13), by device class. */
function Layout() {
  const device = useDevice()
  if (device === 'tv') {
    return (
      <FocusProvider>
        <App />
      </FocusProvider>
    )
  }
  return <MobileApp />
}

export function Shell() {
  return (
    <SettingsProvider>
      <WatchProvider>
        <DeviceProvider>
          <MotionRoot>
            <Layout />
          </MotionRoot>
        </DeviceProvider>
      </WatchProvider>
    </SettingsProvider>
  )
}
