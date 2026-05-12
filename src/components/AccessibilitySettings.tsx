import type {
  AccessibilityOptionDefinition,
  AccessibilitySettingsState,
} from "../accessibility";

type AccessibilitySettingsProps = {
  definitions: AccessibilityOptionDefinition[];
  settings: AccessibilitySettingsState;
  onUpdate: (key: keyof AccessibilitySettingsState, value: boolean) => void;
  onReset: () => void;
};

export function AccessibilitySettings({
  definitions,
  settings,
  onUpdate,
  onReset,
}: AccessibilitySettingsProps) {
  return (
    <section className="surface stack-md" aria-labelledby="settings-panel-title">
      <div>
        <h2 id="settings-panel-title">Saved accessibility preferences</h2>
        <p className="supporting-text">
          These settings affect the appearance and reading experience across the
          app.
        </p>
      </div>

      <div className="settings-grid" role="list">
        {definitions.map((definition) => (
          <label className="setting-card" key={definition.key}>
            <span className="setting-copy">
              <span className="setting-title">{definition.label}</span>
              <span className="setting-description">
                {definition.description}
              </span>
            </span>
            <input
              checked={settings[definition.key]}
              onChange={(event) =>
                onUpdate(definition.key, event.currentTarget.checked)
              }
              type="checkbox"
            />
          </label>
        ))}
      </div>

      <button className="button button-secondary" onClick={onReset} type="button">
        Reset all settings
      </button>
    </section>
  );
}
