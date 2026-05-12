export type Page =
  | "home"
  | "assistant"
  | "simplify"
  | "accommodation"
  | "communication"
  | "settings"
  | "privacy";

export const navigationItems: Array<{ id: Page; label: string }> = [
  { id: "home", label: "Home" },
  { id: "assistant", label: "AI Assistant" },
  { id: "simplify", label: "Simplify Text" },
  { id: "accommodation", label: "Message Builder" },
  { id: "communication", label: "Communication Board" },
  { id: "settings", label: "Settings" },
  { id: "privacy", label: "Privacy" },
];

export function getPageFromHash(hash: string): Page {
  const normalizedHash = hash.replace(/^#/, "");
  const matchingPage = navigationItems.find((item) => item.id === normalizedHash);
  return matchingPage?.id ?? "home";
}

export function getHashForPage(page: Page) {
  return `#${page}`;
}
