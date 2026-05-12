export type AccessibilitySettingsState = {
  largeText: boolean;
  extraLargeText: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  increasedSpacing: boolean;
  simpleLanguageMode: boolean;
  dyslexiaFriendlyFont: boolean;
  hideVisualDistractions: boolean;
};

export type AccessibilityOptionDefinition = {
  key: keyof AccessibilitySettingsState;
  label: string;
  description: string;
};

export const defaultAccessibilitySettings: AccessibilitySettingsState = {
  largeText: false,
  extraLargeText: false,
  highContrast: false,
  reducedMotion: false,
  increasedSpacing: false,
  simpleLanguageMode: true,
  dyslexiaFriendlyFont: false,
  hideVisualDistractions: false,
};

export const accessibilityOptionDefinitions: AccessibilityOptionDefinition[] = [
  {
    key: "largeText",
    label: "Large text",
    description: "Increase the base text size.",
  },
  {
    key: "extraLargeText",
    label: "Extra large text",
    description: "Make text even larger for easier reading.",
  },
  {
    key: "highContrast",
    label: "High contrast",
    description: "Use stronger color contrast for text and controls.",
  },
  {
    key: "reducedMotion",
    label: "Reduced motion",
    description: "Reduce animation and movement where possible.",
  },
  {
    key: "increasedSpacing",
    label: "Increased spacing",
    description: "Add more space between lines and sections.",
  },
  {
    key: "simpleLanguageMode",
    label: "Simple language mode",
    description: "Favor shorter and easier language in the interface.",
  },
  {
    key: "dyslexiaFriendlyFont",
    label: "Dyslexia-friendly font option",
    description: "Switch to a clearer reading font stack.",
  },
  {
    key: "hideVisualDistractions",
    label: "Hide visual distractions",
    description: "Reduce decorative elements and visual noise.",
  },
];

const storageKey = "access-ease-settings";

export function loadAccessibilitySettings(): AccessibilitySettingsState {
  if (typeof window === "undefined") {
    return defaultAccessibilitySettings;
  }

  try {
    const rawValue = window.localStorage.getItem(storageKey);

    if (!rawValue) {
      return defaultAccessibilitySettings;
    }

    const parsed = JSON.parse(rawValue) as Partial<AccessibilitySettingsState>;
    return { ...defaultAccessibilitySettings, ...parsed };
  } catch {
    return defaultAccessibilitySettings;
  }
}

export function saveAccessibilitySettings(
  settings: AccessibilitySettingsState,
) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(storageKey, JSON.stringify(settings));
}
