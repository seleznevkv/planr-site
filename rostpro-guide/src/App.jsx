import { useState } from 'react'
import FileExplorer from './components/FileExplorer'
import RoleSwitcher from './components/RoleSwitcher'
import StepGuide from './components/StepGuide'
import OpeningOverlay from './components/OpeningOverlay'
import Lightbox from './components/Lightbox'
import ContactModal from './components/ContactModal'
import PrivacyPolicy from './components/PrivacyPolicy'
import { roles, personaStepsMap, executorSteps } from './content'

function App() {
  const [role, setRole] = useState(null)
  const [transitioning, setTransitioning] = useState(false)
  const [lightboxItem, setLightboxItem] = useState(null)
  const [overlay, setOverlay] = useState(null)
  const [contactContext, setContactContext] = useState(null)
  const [privacyOpen, setPrivacyOpen] = useState(false)

  const openFromCard = (roleId, rect) => {
    setOverlay({ rect, color: roles[roleId].color, pendingRole: roleId })
  }

  const selectRole = (nextRole) => {
    if (nextRole === role) return
    setTransitioning(true)
    window.setTimeout(() => {
      setRole(nextRole)
      setTransitioning(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 180)
  }

  const goHome = () => {
    setTransitioning(true)
    window.setTimeout(() => {
      setRole(null)
      setTransitioning(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 180)
  }

  const steps = role === 'executor' ? executorSteps : role ? personaStepsMap[role] : null

  return (
    <div
      className={
        'app' + (lightboxItem ? ' lightbox-open' : '') + (contactContext || privacyOpen ? ' modal-open' : '')
      }
    >
      <div className="bg-scene" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <RoleSwitcher current={role} onSelect={selectRole} onHome={goHome} />
      <main className={'screen' + (transitioning ? ' is-transitioning' : '')}>
        {!role && <FileExplorer onOpen={openFromCard} />}
        {role && steps && (
          <StepGuide
            key={role}
            steps={steps}
            color={roles[role].color}
            onImageClick={setLightboxItem}
            onOpenContact={() => setContactContext(roles[role].cardTitle)}
          />
        )}
      </main>
      <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
      <ContactModal
        context={contactContext}
        onClose={() => setContactContext(null)}
        onOpenPrivacy={() => setPrivacyOpen(true)}
      />
      <PrivacyPolicy open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      {overlay && (
        <OpeningOverlay
          rect={overlay.rect}
          color={overlay.color}
          onExpanded={() => setRole(overlay.pendingRole)}
          onFaded={() => setOverlay(null)}
        />
      )}
    </div>
  )
}

export default App
