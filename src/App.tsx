import "./App.css";
import { useState } from "react";

/*
  Emotion category type
*/
type EmotionCategory = {
  title: string;
  emotions: string[];
  response: string;
  designReason: string;
};

/*
  All emotion categories for the project
*/
const categories: EmotionCategory[] = [
  {
    title: "Positive / Energized States",
    emotions: ["Happy", "Excited", "Inspired", "Confident", "Calm"],
    response:
      "Bright interface, creative prompts, and balanced layout.",
    designReason:
      "This mode supports users by reducing unnecessary effort and making the interface easier to process.",
  },
  {
    title: "Low-Energy / Fatigue States",
    emotions: ["Tired", "Fatigued", "Burned out", "Sleepy", "Unmotivated"],
    response:
      "Larger text, gentle layout, fewer steps, and more spacing.",
    designReason:
      "This mode supports users by reducing unnecessary effort and making the interface easier to process.",
  },
  {
    title: "Stress / Anxiety States",
    emotions: ["Stressed", "Anxious", "Overwhelmed", "Nervous", "Panicked"],
    response:
      "Simplified interface, calming layout, and guided interaction.",
    designReason:
      "This mode supports users by reducing unnecessary effort and making the interface easier to process.",
  },
  {
    title: "Negative / Heavy Emotional States",
    emotions: ["Sad", "Lonely", "Discouraged", "Frustrated", "Hopeless"],
    response:
      "Supportive language, soft interface, and encouraging tone.",
    designReason:
      "This mode supports users by reducing unnecessary effort and making the interface easier to process.",
  },
  {
    title: "Anger / Frustration States",
    emotions: ["Angry", "Irritated", "Frustrated", "Impatient", "Defensive"],
    response:
      "Direct communication, fewer interruptions, and quick actions.",
    designReason:
      "This mode supports users by reducing unnecessary effort and making the interface easier to process.",
  },
  {
    title: "Cognitive Load States",
    emotions: [
      "Cognitive overload",
      "Confused",
      "Distracted",
      "Mentally blocked",
      "Decision fatigue",
    ],
    response:
      "Reduced choices, step-by-step guidance, and focus mode.",
    designReason:
      "This mode supports users by reducing unnecessary effort and making the interface easier to process.",
  },
  {
    title: "Sensory Sensitivity States",
    emotions: [
      "Overstimulated",
      "Noise-sensitive",
      "Light-sensitive",
      "Visually strained",
      "Motion-sensitive",
    ],
    response:
      "Reduced motion, muted visuals, softer theme, and larger text.",
    designReason:
      "This mode supports users by reducing unnecessary effort and making the interface easier to process.",
  },
];
function getEmotionGuidance(emotion: string) {
  const guidance: Record<string, string> = {
    Happy: "Keep the full interface available and support creative exploration.",
    Excited: "Use playful but controlled interactions without overwhelming the user.",
    Inspired: "Offer creative prompts and open-ended pathways.",
    Confident: "Keep advanced options visible because the user may want more control.",
    Calm: "Use a balanced interface with normal spacing and clear navigation.",

    Tired: "Increase text size, reduce steps, and avoid unnecessary decisions.",
    Fatigued: "Use high readability, more spacing, and gentle interaction patterns.",
    "Burned out": "Show only essential actions and use calm, supportive language.",
    Sleepy: "Use large buttons, readable text, and avoid visually tiring elements.",
    Unmotivated: "Suggest one small next step instead of presenting too many choices.",

    Stressed: "Simplify the interface and reduce competing information.",
    Anxious: "Use reassurance, predictable layout, and calming instructions.",
    Overwhelmed: "Show one action at a time and hide non-essential details.",
    Nervous: "Provide guided instructions and reduce uncertainty.",
    Panicked: "Use an emergency-simple interface with only the most important action.",

    Sad: "Use a gentle tone and avoid overly energetic visual language.",
    Lonely: "Offer supportive copy and connection-oriented prompts.",
    Discouraged: "Use encouraging language and break tasks into achievable steps.",
    Frustrated: "Make error recovery clear and reduce repeated effort.",
    Hopeless: "Use very careful, supportive language and avoid pressure.",

    Angry: "Use direct language, avoid interruptions, and give the user control.",
    Irritated: "Remove popups and reduce friction wherever possible.",
    Impatient: "Make quick actions visible and reduce waiting moments.",
    Defensive: "Use neutral wording and avoid blame-based messages.",

    "Cognitive overload": "Reduce choices and present information in smaller chunks.",
    Confused: "Use step-by-step guidance and clearer labels.",
    Distracted: "Activate focus mode and reduce visual clutter.",
    "Mentally blocked": "Break the task into small, manageable actions.",
    "Decision fatigue": "Recommend a default option to reduce decision pressure.",

    Overstimulated: "Reduce motion, mute visuals, and remove unnecessary effects.",
    "Noise-sensitive": "Avoid auto-playing sound and provide quiet interaction patterns.",
    "Light-sensitive": "Use a darker or softer theme to reduce visual strain.",
    "Visually strained": "Increase text size, spacing, and contrast clarity.",
    "Motion-sensitive": "Disable animation and avoid moving interface elements.",
  };

  return guidance[emotion] || "Select an emotion or state to see interface guidance.";
}
function App() {
  /*
    Store currently selected category
  */
  const [selectedCategory, setSelectedCategory] =
    useState<EmotionCategory | null>(null);
  const [selectedEmotion, setSelectedEmotion] =
    useState<string>("");
  const [largeText, setLargeText] = useState(false);

  const [reducedMotion, setReducedMotion] = useState(false);

  const [highContrast, setHighContrast] = useState(false);

  function handleCategorySelect(category: EmotionCategory) {
    setSelectedCategory(category);
    setSelectedEmotion("");
  }

  function resetInterface() {
    setSelectedCategory(null);
    setSelectedEmotion("");
    setLargeText(false);
    setReducedMotion(false);
    setHighContrast(false);
  }

  return (
    <>
      <div
        className={`app
      ${selectedCategory
            ? selectedCategory.title.toLowerCase().replaceAll(" ", "-")
            : ""
          }
      ${largeText ? "large-text-mode" : ""}
      ${reducedMotion ? "reduced-motion-mode" : ""}
      ${highContrast ? "high-contrast-mode" : ""}
    `}>

        {/* Header */}
        <header className="header">
          <h1>Emotion-to-Interface Adapter</h1>

          <p>
            A human-centered accessibility interface that adapts to emotional,
            cognitive, and sensory states.
          </p>
        </header>

        {/* Main content */}
        <main>
          <section className="controls-section">
            <h2>Accessibility Controls</h2>

            <div className="controls-grid">
              <button
                className={largeText ? "control-active" : ""}
                onClick={() => setLargeText(!largeText)}
              >
                Large Text: {largeText ? "On" : "Off"}
              </button>

              <button
                className={reducedMotion ? "control-active" : ""}
                onClick={() => setReducedMotion(!reducedMotion)}
              >
                Reduced Motion: {reducedMotion ? "On" : "Off"}
              </button>

              <button
                className={highContrast ? "control-active" : ""}
                onClick={() => setHighContrast(!highContrast)}
              >
                High Contrast: {highContrast ? "On" : "Off"}
              </button>
              <button
                className="reset-all-button"
                onClick={resetInterface}
              >
                Reset All Settings
              </button>
            </div>

            <button onClick={() => setReducedMotion(!reducedMotion)}>
              Toggle Reduced Motion
            </button>

            <button onClick={() => setHighContrast(!highContrast)}>
              Toggle High Contrast
            </button>
          </section>
          <div className="controls-grid"></div>
          {/* Category section */}
          <section className="intro-section">
          </section>
          <section className="skills-section">
            <h2>Skills Demonstrated</h2>

            <div className="skills-grid">
              <span>Inclusive UX</span>
              <span>Accessibility Thinking</span>
              <span>Adaptive Interfaces</span>
              <span>React</span>
              <span>TypeScript</span>
              <span>Vite</span>
              <span>Semantic HTML</span>
              <span>CSS</span>
            </div>
          </section>
          <h2>Project Purpose</h2>

          <p>
            This project explores how digital interfaces can respond to emotional,
            cognitive, and sensory states. Instead of assuming every user needs the
            same interface at all times, the app demonstrates how design can become
            more supportive, readable, focused, or calm depending on user needs.
          </p>

          <section className="category-section">
            <h2>Emotion Categories</h2>

            <div className="card-grid">
              {categories.map((category) => (
                <button
                  key={category.title}
                  className="emotion-card"
                  onClick={() => handleCategorySelect(category)}
                >
                  <h3>{category.title}</h3>

                  <p>{category.emotions.join(", ")}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Selected category details */}
          {
            selectedCategory && (
              <section className="details-section">
                <h2>{selectedCategory.title}</h2>

                <h3>States</h3>
                <div className="emotion-button-group">
                  {selectedCategory.emotions.map((emotion) => (
                    <button
                      key={emotion}
                      className="emotion-tag"
                      onClick={() => setSelectedEmotion(emotion)}
                    >
                      {emotion}
                    </button>
                  ))}
                </div>

                {selectedEmotion && (
                  <>
                    <h3>Selected Emotion / State</h3>

                    <p>{selectedEmotion}</p>
                    <p className="emotion-guidance">
                      {getEmotionGuidance(selectedEmotion)}
                    </p>

                  </>
                )}

                <h3>Adaptive UI Response</h3>

                <p>{selectedCategory.response}</p>
                <div className="preview-panel">
                  <h3>Adaptive Interface Preview</h3>

                  <div className="preview-content">
                    <button>Primary Action</button>

                    {selectedCategory.title !== "Stress / Anxiety States" &&
                      selectedCategory.title !== "Cognitive Load States" && (
                        <>
                          <button>Secondary Option</button>
                          <button>Extra Settings</button>
                        </>
                      )}

                    <p>
                      This area simulates how an adaptive interface may change based on
                      emotional, cognitive, or sensory conditions.
                    </p>
                  </div>
                </div>
                <h3>Why this design helps</h3>

                <p>{selectedCategory.designReason}</p>

                <h3>Accessibility Features Demonstrated</h3>

                <ul className="accessibility-list">
                  <li>Clear emotional-state selection</li>
                  <li>Reduced visual complexity for stress and overload</li>
                  <li>Larger readable layout for fatigue</li>
                  <li>Reduced motion support for sensory sensitivity</li>
                  <li>Supportive and non-judgmental interface language</li>
                </ul>

                <button
                  className="reset-button"
                  onClick={resetInterface}
                >
                  Reset Interface
                </button>
              </section>
            )
          }
        </main >

        {/* Footer */}
        < footer className="footer" >
          <p>
            Designed with inclusive UX and accessibility-centered thinking.
          </p>
        </footer >
      </div >
    </>
  );
}

export default App;
