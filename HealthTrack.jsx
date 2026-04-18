import { useState, useEffect } from "react";

const SDG3_GREEN = "#2d8653";
const DARK = "#0d1f17";
const CARD_BG = "#f4faf6";
const ACCENT = "#56c17a";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');`;

function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState(null);

  const calc = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (!h || !w) return;
    const bmi = (w / (h * h)).toFixed(1);
    let cat = "", color = "";
    if (bmi < 18.5) { cat = "Underweight"; color = "#f59e0b"; }
    else if (bmi < 25) { cat = "Normal ✓"; color = SDG3_GREEN; }
    else if (bmi < 30) { cat = "Overweight"; color = "#f97316"; }
    else { cat = "Obese"; color = "#ef4444"; }
    setResult({ bmi, cat, color });
  };

  return (
    <div style={{ background: "#fff", borderRadius: 20, padding: 28, boxShadow: "0 4px 24px #2d865318" }}>
      <h3 style={{ fontFamily: "Syne", fontWeight: 800, color: DARK, margin: "0 0 20px", fontSize: 20 }}>⚖️ BMI Calculator</h3>
      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: 12, color: "#666", fontFamily: "DM Sans", display: "block", marginBottom: 6 }}>HEIGHT (cm)</label>
          <input value={height} onChange={e => setHeight(e.target.value)} placeholder="170"
            style={{ width: "100%", padding: "10px 14px", border: "2px solid #e5e7eb", borderRadius: 10, fontFamily: "DM Sans", fontSize: 16, outline: "none", boxSizing: "border-box" }} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: 12, color: "#666", fontFamily: "DM Sans", display: "block", marginBottom: 6 }}>WEIGHT (kg)</label>
          <input value={weight} onChange={e => setWeight(e.target.value)} placeholder="70"
            style={{ width: "100%", padding: "10px 14px", border: "2px solid #e5e7eb", borderRadius: 10, fontFamily: "DM Sans", fontSize: 16, outline: "none", boxSizing: "border-box" }} />
        </div>
      </div>
      <button onClick={calc} style={{ width: "100%", padding: "12px", background: SDG3_GREEN, color: "#fff", border: "none", borderRadius: 12, fontFamily: "Syne", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
        Calculate BMI
      </button>
      {result && (
        <div style={{ marginTop: 20, padding: "16px 20px", background: `${result.color}12`, borderRadius: 14, borderLeft: `4px solid ${result.color}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "DM Sans", color: "#444" }}>Your BMI</span>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 28, color: result.color }}>{result.bmi}</div>
            <div style={{ fontFamily: "DM Sans", fontSize: 13, color: result.color, fontWeight: 500 }}>{result.cat}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function WaterTracker() {
  const [glasses, setGlasses] = useState(0);
  const goal = 8;
  const pct = Math.min((glasses / goal) * 100, 100);

  return (
    <div style={{ background: "#fff", borderRadius: 20, padding: 28, boxShadow: "0 4px 24px #2d865318" }}>
      <h3 style={{ fontFamily: "Syne", fontWeight: 800, color: DARK, margin: "0 0 6px", fontSize: 20 }}>💧 Water Intake</h3>
      <p style={{ fontFamily: "DM Sans", color: "#888", fontSize: 13, margin: "0 0 20px" }}>Daily goal: {goal} glasses</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {Array.from({ length: goal }).map((_, i) => (
          <div key={i} onClick={() => setGlasses(i < glasses ? i : i + 1)}
            style={{ width: 36, height: 48, borderRadius: 8, cursor: "pointer", background: i < glasses ? "#60c5f1" : "#e5e7eb", transition: "all 0.2s", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4 }}>
            {i < glasses && <span style={{ fontSize: 10 }}>💧</span>}
          </div>
        ))}
      </div>
      <div style={{ background: "#e5f6fd", borderRadius: 100, height: 10, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: "linear-gradient(90deg,#60c5f1,#2196f3)", borderRadius: 100, transition: "width 0.4s" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
        <span style={{ fontFamily: "DM Sans", fontSize: 13, color: "#666" }}>{glasses} / {goal} glasses</span>
        <span style={{ fontFamily: "DM Sans", fontSize: 13, color: glasses >= goal ? SDG3_GREEN : "#888" }}>{glasses >= goal ? "✅ Goal reached!" : `${goal - glasses} more to go`}</span>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        <button onClick={() => setGlasses(Math.max(0, glasses - 1))}
          style={{ flex: 1, padding: "10px", background: "#f3f4f6", border: "none", borderRadius: 10, fontFamily: "Syne", fontWeight: 700, cursor: "pointer", fontSize: 18 }}>−</button>
        <button onClick={() => setGlasses(Math.min(goal, glasses + 1))}
          style={{ flex: 2, padding: "10px", background: "#e0f7fa", border: "none", borderRadius: 10, fontFamily: "Syne", fontWeight: 700, cursor: "pointer", color: "#0277bd" }}>+ Add Glass</button>
      </div>
    </div>
  );
}

function StepTracker() {
  const [steps, setSteps] = useState(4320);
  const goal = 10000;
  const pct = Math.min((steps / goal) * 100, 100);
  const cals = Math.round(steps * 0.04);

  return (
    <div style={{ background: "#fff", borderRadius: 20, padding: 28, boxShadow: "0 4px 24px #2d865318" }}>
      <h3 style={{ fontFamily: "Syne", fontWeight: 800, color: DARK, margin: "0 0 6px", fontSize: 20 }}>🚶 Step Counter</h3>
      <p style={{ fontFamily: "DM Sans", color: "#888", fontSize: 13, margin: "0 0 20px" }}>Daily goal: {goal.toLocaleString()} steps</p>
      <div style={{ position: "relative", width: 140, height: 140, margin: "0 auto 20px" }}>
        <svg width="140" height="140" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="70" cy="70" r="60" fill="none" stroke="#e5e7eb" strokeWidth="10" />
          <circle cx="70" cy="70" r="60" fill="none" stroke={SDG3_GREEN} strokeWidth="10"
            strokeDasharray={`${2 * Math.PI * 60}`} strokeDashoffset={`${2 * Math.PI * 60 * (1 - pct / 100)}`}
            strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.5s" }} />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 22, color: DARK }}>{steps.toLocaleString()}</div>
          <div style={{ fontFamily: "DM Sans", fontSize: 12, color: "#888" }}>steps</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        {[["🔥", `${cals}`, "cal burned"], ["📍", `${(steps * 0.0008).toFixed(1)}`, "km walked"]].map(([icon, val, label]) => (
          <div key={label} style={{ flex: 1, background: "#f4faf6", borderRadius: 12, padding: "12px", textAlign: "center" }}>
            <div style={{ fontSize: 20 }}>{icon}</div>
            <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 18, color: SDG3_GREEN }}>{val}</div>
            <div style={{ fontFamily: "DM Sans", fontSize: 11, color: "#888" }}>{label}</div>
          </div>
        ))}
      </div>
      <input type="range" min="0" max="15000" value={steps} onChange={e => setSteps(+e.target.value)}
        style={{ width: "100%", accentColor: SDG3_GREEN }} />
    </div>
  );
}

function MedicationReminder() {
  const [meds, setMeds] = useState([
    { name: "Vitamin D", time: "08:00", taken: false },
    { name: "Iron Supplement", time: "13:00", taken: true },
    { name: "Omega-3", time: "20:00", taken: false },
  ]);
  const [newMed, setNewMed] = useState("");
  const [newTime, setNewTime] = useState("09:00");

  const toggle = (i) => setMeds(meds.map((m, idx) => idx === i ? { ...m, taken: !m.taken } : m));
  const add = () => {
    if (!newMed.trim()) return;
    setMeds([...meds, { name: newMed, time: newTime, taken: false }]);
    setNewMed("");
  };

  return (
    <div style={{ background: "#fff", borderRadius: 20, padding: 28, boxShadow: "0 4px 24px #2d865318" }}>
      <h3 style={{ fontFamily: "Syne", fontWeight: 800, color: DARK, margin: "0 0 20px", fontSize: 20 }}>💊 Medication Reminders</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        {meds.map((m, i) => (
          <div key={i} onClick={() => toggle(i)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 12, background: m.taken ? "#f0fdf4" : "#f9fafb", cursor: "pointer", border: `1.5px solid ${m.taken ? "#86efac" : "#e5e7eb"}`, transition: "all 0.2s" }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: m.taken ? SDG3_GREEN : "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {m.taken && <span style={{ color: "#fff", fontSize: 13 }}>✓</span>}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "DM Sans", fontWeight: 500, color: m.taken ? "#166534" : DARK, textDecoration: m.taken ? "line-through" : "none", fontSize: 15 }}>{m.name}</div>
              <div style={{ fontFamily: "DM Sans", fontSize: 12, color: "#888" }}>⏰ {m.time}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input value={newMed} onChange={e => setNewMed(e.target.value)} placeholder="Add medication..."
          style={{ flex: 1, padding: "10px 14px", border: "2px solid #e5e7eb", borderRadius: 10, fontFamily: "DM Sans", fontSize: 14, outline: "none" }} />
        <input type="time" value={newTime} onChange={e => setNewTime(e.target.value)}
          style={{ padding: "10px", border: "2px solid #e5e7eb", borderRadius: 10, fontFamily: "DM Sans", fontSize: 14, outline: "none" }} />
        <button onClick={add} style={{ padding: "10px 16px", background: SDG3_GREEN, color: "#fff", border: "none", borderRadius: 10, fontFamily: "Syne", fontWeight: 700, cursor: "pointer", fontSize: 18 }}>+</button>
      </div>
    </div>
  );
}

const tips = [
  { icon: "🥗", tip: "Eat at least 5 portions of fruit and vegetables daily." },
  { icon: "😴", tip: "Adults need 7–9 hours of quality sleep each night." },
  { icon: "🏃", tip: "Aim for 150 minutes of moderate exercise per week." },
  { icon: "🧠", tip: "Practice mindfulness or meditation to reduce stress." },
  { icon: "🚭", tip: "Avoid tobacco — it's a leading cause of preventable disease." },
  { icon: "🤝", tip: "Strong social connections improve mental and physical health." },
];

export default function HealthTrack() {
  const [tab, setTab] = useState("dashboard");
  const [tipIdx, setTipIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTipIdx(i => (i + 1) % tips.length), 5000);
    return () => clearInterval(t);
  }, []);

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: "🏠" },
    { id: "bmi", label: "BMI", icon: "⚖️" },
    { id: "water", label: "Water", icon: "💧" },
    { id: "steps", label: "Steps", icon: "🚶" },
    { id: "meds", label: "Meds", icon: "💊" },
  ];

  return (
    <>
      <style>{`
        ${fonts}
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${CARD_BG}; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: #c3e6d0; border-radius: 10px; }
      `}</style>

      <div style={{ minHeight: "100vh", background: CARD_BG, fontFamily: "DM Sans, sans-serif" }}>
        {/* Header */}
        <div style={{ background: DARK, padding: "0 24px", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 20px #0d1f1755" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: SDG3_GREEN, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🌿</div>
              <div>
                <div style={{ fontFamily: "Syne", fontWeight: 800, color: "#fff", fontSize: 18, lineHeight: 1 }}>HealthTrack</div>
                <div style={{ fontFamily: "DM Sans", fontSize: 10, color: ACCENT, letterSpacing: 2 }}>SDG 3 · GOOD HEALTH</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: ACCENT, animation: "pulse 2s infinite" }} />
              <span style={{ fontFamily: "DM Sans", color: "#aaa", fontSize: 12 }}>Live</span>
            </div>
          </div>
        </div>

        {/* SDG Banner */}
        <div style={{ background: `linear-gradient(135deg, ${SDG3_GREEN} 0%, #1a5c38 100%)`, padding: "20px 24px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontFamily: "Syne", fontWeight: 800, color: "#fff", fontSize: 22 }}>Sustainable Development Goal 3</div>
              <div style={{ fontFamily: "DM Sans", color: "#a7f3d0", fontSize: 14, marginTop: 4 }}>Ensure healthy lives and promote well-being for all at all ages</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 16, padding: "12px 20px", backdropFilter: "blur(10px)", minWidth: 200 }}>
              <div style={{ fontFamily: "DM Sans", fontSize: 11, color: "#a7f3d0", letterSpacing: 1, marginBottom: 6 }}>DAILY HEALTH TIP</div>
              <div style={{ fontFamily: "DM Sans", fontSize: 14, color: "#fff", lineHeight: 1.5 }}>
                <span style={{ marginRight: 8 }}>{tips[tipIdx].icon}</span>{tips[tipIdx].tip}
              </div>
            </div>
          </div>
        </div>

        {/* Nav Tabs */}
        <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 64, zIndex: 99 }}>
          <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", overflowX: "auto", padding: "0 16px" }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                style={{ padding: "14px 20px", border: "none", background: "none", cursor: "pointer", fontFamily: "Syne", fontWeight: 700, fontSize: 14, color: tab === t.id ? SDG3_GREEN : "#888", borderBottom: `3px solid ${tab === t.id ? SDG3_GREEN : "transparent"}`, whiteSpace: "nowrap", transition: "all 0.2s" }}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 16px 40px" }}>
          {tab === "dashboard" && (
            <div>
              <div style={{ marginBottom: 28 }}>
                <h2 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 26, color: DARK }}>Good morning! 👋</h2>
                <p style={{ fontFamily: "DM Sans", color: "#666", marginTop: 4 }}>Here's your health overview for today.</p>
              </div>

              {/* Stats Row */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 16, marginBottom: 28 }}>
                {[
                  { icon: "🚶", val: "4,320", label: "Steps Today", color: "#dcfce7" },
                  { icon: "💧", val: "5 / 8", label: "Glasses Water", color: "#e0f2fe" },
                  { icon: "💊", val: "1 / 3", label: "Meds Taken", color: "#fef9c3" },
                  { icon: "⚖️", val: "22.4", label: "BMI", color: "#f0fdf4" },
                ].map(s => (
                  <div key={s.label} style={{ background: s.color, borderRadius: 18, padding: 20, textAlign: "center" }}>
                    <div style={{ fontSize: 28 }}>{s.icon}</div>
                    <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 22, color: DARK, marginTop: 8 }}>{s.val}</div>
                    <div style={{ fontFamily: "DM Sans", fontSize: 12, color: "#555", marginTop: 4 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Quick Access */}
              <h3 style={{ fontFamily: "Syne", fontWeight: 800, color: DARK, marginBottom: 16, fontSize: 18 }}>Quick Access</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                {tabs.slice(1).map(t => (
                  <button key={t.id} onClick={() => setTab(t.id)}
                    style={{ background: "#fff", border: "2px solid #e5e7eb", borderRadius: 16, padding: "20px", cursor: "pointer", textAlign: "left", transition: "all 0.2s", fontFamily: "Syne" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = SDG3_GREEN; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.transform = "none"; }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{t.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: DARK }}>{t.label}</div>
                    <div style={{ fontFamily: "DM Sans", fontSize: 12, color: "#888", marginTop: 4 }}>Tap to open →</div>
                  </button>
                ))}
              </div>

              {/* SDG Info */}
              <div style={{ marginTop: 28, background: "#fff", borderRadius: 20, padding: 28, boxShadow: "0 4px 24px #2d865318", borderLeft: `5px solid ${SDG3_GREEN}` }}>
                <h3 style={{ fontFamily: "Syne", fontWeight: 800, color: SDG3_GREEN, marginBottom: 12, fontSize: 18 }}>About SDG 3 – Good Health & Well-Being</h3>
                <p style={{ fontFamily: "DM Sans", color: "#555", lineHeight: 1.8, fontSize: 14 }}>
                  The United Nations' SDG 3 aims to ensure healthy lives and promote well-being for people of all ages.
                  HealthTrack contributes to this goal by empowering individuals to monitor daily health metrics,
                  stay hydrated, track physical activity, and manage medications — all in one place.
                </p>
                <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
                  {["🏥 Universal Health", "💉 Disease Prevention", "🧬 Mental Well-Being", "🌍 Global Impact"].map(tag => (
                    <span key={tag} style={{ background: "#f0fdf4", color: SDG3_GREEN, fontFamily: "DM Sans", fontSize: 12, fontWeight: 500, padding: "6px 12px", borderRadius: 100, border: `1px solid #86efac` }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === "bmi" && <BMICalculator />}
          {tab === "water" && <WaterTracker />}
          {tab === "steps" && <StepTracker />}
          {tab === "meds" && <MedicationReminder />}
        </div>

        {/* Footer */}
        <div style={{ background: DARK, padding: "20px 24px", textAlign: "center" }}>
          <div style={{ fontFamily: "Syne", fontWeight: 800, color: ACCENT, fontSize: 14 }}>HealthTrack · SDG 3</div>
          <div style={{ fontFamily: "DM Sans", color: "#555", fontSize: 12, marginTop: 4 }}>Moaz Basiouny · Innovation University</div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </>
  );
}
