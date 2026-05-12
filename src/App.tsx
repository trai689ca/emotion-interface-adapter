import { useEffect, useId, useState } from "react";
import "./styles.css";
import { Header } from "./components/Header";
import { ChatInterface } from "./components/ChatInterface";
import { TextSimplifier } from "./components/TextSimplifier";
import { AccommodationBuilder } from "./components/AccommodationBuilder";
import { QuickCommunicationBoard } from "./components/QuickCommunicationBoard";
import { AccessibilitySettings } from "./components/AccessibilitySettings";
import { DisclaimerBox } from "./components/DisclaimerBox";
import {
  accessibilityOptionDefinitions,
  defaultAccessibilitySettings,
  loadAccessibilitySettings,
  saveAccessibilitySettings,
  type AccessibilitySettingsState,
} from "./accessibility";
import { getHashForPage, getPageFromHash, type Page } from "./appPages";

const homeActions: Array<{
  page: Exclude<Page, "privacy">;
  title: string;
  description: string;
}> = [
  {
    page: "assistant",
    title: "AI Assistant",
    description: "Ask questions and get plain-language support for digital tasks.",
  },
  {
    page: "simplify",
    title: "Simplify Text",
    description: "Turn difficult information into a summary, explanation, and checklist.",
  },
  {
    page: "accommodation",
    title: "Accommodation Message Builder",
    description: "Create respectful messages that explain an accessibility need.",
  },
  {
    page: "communication",
    title: "Quick Communication Board",
    description: "Use large message buttons for common accessibility communication needs.",
  },
  {
    page: "settings",
    title: "Accessibility Settings",
    description: "Save display and language preferences for a more comfortable experience.",
  },
];

function App() {
  const [page, setPage] = useState<Page>(() => {
    if (typeof window === "undefined") {
      return "home";
    }

    return getPageFromHash(window.location.hash);
  });
  const [settings, setSettings] = useState<AccessibilitySettingsState>(() =>
    loadAccessibilitySettings(),
  );
  const mainHeadingId = useId();

  useEffect(() => {
    saveAccessibilitySettings(settings);
  }, [settings]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.largeText = String(settings.largeText);
    root.dataset.extraLargeText = String(settings.extraLargeText);
    root.dataset.highContrast = String(settings.highContrast);
    root.dataset.reducedMotion = String(settings.reducedMotion);
    root.dataset.increasedSpacing = String(settings.increasedSpacing);
    root.dataset.simpleLanguage = String(settings.simpleLanguageMode);
    root.dataset.dyslexiaFont = String(settings.dyslexiaFriendlyFont);
    root.dataset.hideDistractions = String(settings.hideVisualDistractions);
  }, [settings]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleHashChange = () => {
      setPage(getPageFromHash(window.location.hash));
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  function updateSetting(
    key: keyof AccessibilitySettingsState,
    value: boolean,
  ) {
    setSettings((current) => ({ ...current, [key]: value }));
  }

  function resetSettings() {
    setSettings(defaultAccessibilitySettings);
  }

  function navigateTo(nextPage: Page) {
    setPage(nextPage);

    if (typeof window !== "undefined") {
      window.location.hash = getHashForPage(nextPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href={`#${mainHeadingId}`}>
        Skip to main content
      </a>

      <Header currentPage={page} onNavigate={navigateTo} />

      <main className="page-shell" id={mainHeadingId}>
        {page === "home" && (
          <section className="stack-lg" aria-labelledby="home-title">
            <div className="hero-card surface">
              <p className="eyebrow">Accessibility-first AI support</p>
              <h1 id="home-title">AccessEase AI</h1>
              <p className="lede">
                AccessEase AI helps people understand difficult information,
                complete online tasks, and communicate accessibility needs in
                clear language.
              </p>
              <p className="supporting-text">
                This app is designed for blind and low-vision users,
                neurodivergent users, people with cognitive, motor, speech, and
                communication disabilities, and Deaf or hard-of-hearing users.
              </p>
            </div>

            <section className="surface stack-md" aria-labelledby="quick-start">
              <div>
                <h2 id="quick-start">Choose a tool</h2>
                <p className="supporting-text">
                  Every tool is designed to work with keyboard navigation,
                  visible focus states, responsive layouts, and saved
                  accessibility preferences.
                </p>
              </div>

              <div className="feature-grid">
                {homeActions.map((action) => (
                  <button
                    key={action.page}
                    className="feature-card"
                    onClick={() => navigateTo(action.page)}
                    type="button"
                  >
                    <span className="feature-title">{action.title}</span>
                    <span className="feature-description">
                      {action.description}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            <DisclaimerBox title="Important safety note">
              AccessEase AI is not legal, medical, financial, or emergency
              advice. If this is an emergency, contact local emergency services
              right away.
            </DisclaimerBox>
          </section>
        )}

        {page === "assistant" && (
          <section className="stack-lg" aria-labelledby="assistant-title">
            <div className="surface stack-sm">
              <h1 id="assistant-title">AI Assistant</h1>
              <p className="supporting-text">
                Ask for help understanding information, planning steps, or
                preparing for an online task. Responses default to plain
                language.
              </p>
            </div>

            <ChatInterface simpleLanguageMode={settings.simpleLanguageMode} />

            <DisclaimerBox title="Use care with personal details">
              Do not enter highly sensitive personal, medical, legal, or
              financial information into the assistant.
            </DisclaimerBox>
          </section>
        )}

        {page === "simplify" && (
          <section className="stack-lg" aria-labelledby="simplify-title">
            <div className="surface stack-sm">
              <h1 id="simplify-title">Simplify Text</h1>
              <p className="supporting-text">
                Paste difficult text and get a short summary, a clearer
                explanation, useful questions, and a practical checklist.
              </p>
            </div>

            <TextSimplifier simpleLanguageMode={settings.simpleLanguageMode} />
          </section>
        )}

        {page === "accommodation" && (
          <section className="stack-lg" aria-labelledby="accommodation-title">
            <div className="surface stack-sm">
              <h1 id="accommodation-title">Accommodation Message Builder</h1>
              <p className="supporting-text">
                Describe the situation and your need, and AccessEase AI will
                draft a respectful message you can copy and use.
              </p>
            </div>

            <AccommodationBuilder />
          </section>
        )}

        {page === "communication" && (
          <section className="stack-lg" aria-labelledby="communication-title">
            <div className="surface stack-sm">
              <h1 id="communication-title">Quick Communication Board</h1>
              <p className="supporting-text">
                Select a common communication need to generate a message for
                sharing in person, online, or by email.
              </p>
            </div>

            <QuickCommunicationBoard />
          </section>
        )}

        {page === "settings" && (
          <section className="stack-lg" aria-labelledby="settings-title">
            <div className="surface stack-sm">
              <h1 id="settings-title">Accessibility Settings</h1>
              <p className="supporting-text">
                Changes are saved automatically on this device using local
                storage.
              </p>
            </div>

            <AccessibilitySettings
              definitions={accessibilityOptionDefinitions}
              settings={settings}
              onUpdate={updateSetting}
              onReset={resetSettings}
            />
          </section>
        )}

        {page === "privacy" && (
          <section className="stack-lg" aria-labelledby="privacy-title">
            <div className="surface stack-md">
              <h1 id="privacy-title">Privacy Notice</h1>
              <p className="supporting-text">
                AccessEase AI is built to reduce barriers, but it should not be
                used for highly sensitive secrets or emergency situations.
              </p>
              <div className="stack-sm">
                <p>
                  Avoid entering highly sensitive personal, medical, legal, or
                  financial information unless you fully understand where the AI
                  service is running and how data is stored.
                </p>
                <p>
                  Accessibility preferences are stored locally on this device so
                  the app can remember your display and language settings.
                </p>
                <p>
                  If this is an emergency or crisis, contact local emergency
                  services or a trusted local crisis resource immediately.
                </p>
              </div>
            </div>

            <DisclaimerBox title="Current technical setup">
              The frontend is prepared to call a backend route at
              <code>/api/ai</code>. If no backend key is configured, the app
              uses safe mock responses for local development.
            </DisclaimerBox>
          </section>
        )}
      </main>

      <footer className="site-footer surface">
        <p className="supporting-text">
          AccessEase AI is designed to support understanding and accessibility
          communication in plain language. It is not a replacement for
          emergency, medical, legal, or financial professionals.
        </p>
      </footer>
    </div>
  );
}

export default App;
