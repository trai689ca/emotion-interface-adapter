import { navigationItems, type Page } from "../appPages";
import { AccessibleButton } from "./AccessibleButton";

type HeaderProps = {
  currentPage: Page;
  onNavigate: (page: Page) => void;
};

export function Header({ currentPage, onNavigate }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="brand-lockup">
        <p className="brand-name">AccessEase AI</p>
        <p className="brand-tagline">
          Plain-language AI support for accessibility needs
        </p>
      </div>

      <nav aria-label="Primary">
        <ul className="nav-list">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <AccessibleButton
                aria-current={currentPage === item.id ? "page" : undefined}
                onClick={() => onNavigate(item.id)}
                variant={currentPage === item.id ? "primary" : "quiet"}
              >
                {item.label}
              </AccessibleButton>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
