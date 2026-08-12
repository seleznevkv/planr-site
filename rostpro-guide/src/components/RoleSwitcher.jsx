import { roles } from '../content'
import logoLight from '../assets/logo.svg'
import logoDark from '../assets/logo-dark.svg'

export default function RoleSwitcher({ current, onSelect, onHome }) {
  return (
    <header className="topbar">
      <button className="brand" onClick={onHome} type="button" aria-label="На главную">
        <img src={logoLight} alt="РостПро" className="brand__logo brand__logo--light" />
        <img src={logoDark} alt="РостПро" className="brand__logo brand__logo--dark" />
      </button>
      {current && (
        <nav className="role-switcher" aria-label="Переключить роль">
          {Object.values(roles).map((role) => (
            <button
              key={role.id}
              type="button"
              className={'role-switcher__item' + (current === role.id ? ' is-active' : '')}
              onClick={() => onSelect(role.id)}
            >
              {role.nav}
            </button>
          ))}
        </nav>
      )}
    </header>
  )
}
