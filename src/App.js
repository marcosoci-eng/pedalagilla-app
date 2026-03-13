import { useState } from "react";

const C = {
  blueGreen: "#219EBC",
  deepBlue: "#023047",
  skyBlue: "#8ECAE6",
  sunYellow: "#FFB703",
  warmOrange: "#FB8500",
  white: "#FFFFFF",
  bgLight: "#F5F9FB",
};

const bikes = [
  { id: "PA-021", battery: 88, status: "Disponibile", odometer: 386.9, zone: "Passignano", model: "City Comfort", range: 52 },
  { id: "PA-033", battery: 100, status: "Disponibile", odometer: 265, zone: "Castiglione", model: "City Comfort", range: 60 },
  { id: "PA-035", battery: 43, status: "Manutenzione", odometer: 0, zone: "Tuoro", model: "Trail Explorer", range: 26 },
  { id: "PA-012", battery: 89, status: "Disponibile", odometer: 346.7, zone: "Magione", model: "Trail Explorer", range: 53 },
  { id: "PA-005", battery: 76, status: "Disponibile", odometer: 220.7, zone: "Passignano", model: "City Comfort", range: 46 },
  { id: "PA-020", battery: 74, status: "Disponibile", odometer: 380.4, zone: "Panicale", model: "Trail Explorer", range: 44 },
  { id: "PA-029", battery: 80, status: "Disponibile", odometer: 234.6, zone: "Castiglione", model: "City Comfort", range: 48 },
  { id: "PA-039", battery: 78, status: "Disponibile", odometer: 561.8, zone: "Tuoro", model: "Trail Explorer", range: 47 },
  { id: "PA-034", battery: 100, status: "Manutenzione", odometer: 157.5, zone: "Magione", model: "City Comfort", range: 60 },
  { id: "PA-003", battery: 77, status: "Disponibile", odometer: 351.3, zone: "Passignano", model: "City Comfort", range: 46 },
  { id: "PA-016", battery: 96, status: "Disponibile", odometer: 502.8, zone: "Panicale", model: "Trail Explorer", range: 58 },
  { id: "PA-015", battery: 30, status: "Manutenzione", odometer: 0, zone: "Tuoro", model: "City Comfort", range: 18 },
];

const workOrders = [
  { id: "OL-001", bike: "PA-035", type: "Batteria scarica", priority: "Alta", date: "13/03/2026", tech: "Marco R.", status: "Aperto", zone: "Tuoro" },
  { id: "OL-002", bike: "PA-015", type: "Sostituzione batteria", priority: "Alta", date: "13/03/2026", tech: "Luigi B.", status: "In corso", zone: "Tuoro" },
  { id: "OL-003", bike: "PA-034", type: "Pick Up", priority: "Media", date: "12/03/2026", tech: "Sara V.", status: "Completato", zone: "Magione" },
  { id: "OL-004", bike: "PA-022", type: "Ispezione", priority: "Bassa", date: "14/03/2026", tech: "Marco R.", status: "Aperto", zone: "Castiglione" },
];

const routes = [
  { name: "Giro del Lago", km: 62, duration: "4h", difficulty: "Media", stops: ["Passignano", "Tuoro", "Castiglione", "Magione"] },
  { name: "Borghi e Colline", km: 28, duration: "2h", difficulty: "Facile", stops: ["Panicale", "Castiglione"] },
  { name: "Tramonto sul Lago", km: 18, duration: "1h30", difficulty: "Facile", stops: ["Passignano", "Tuoro"] },
  { name: "Tour delle Cantine", km: 35, duration: "3h", difficulty: "Media", stops: ["Magione", "Panicale", "Castiglione"] },
];

const getBattColor = (b) => b >= 80 ? C.blueGreen : b >= 50 ? C.sunYellow : C.warmOrange;
const getStatusColor = (s) => s === "Disponibile" ? C.blueGreen : s === "Manutenzione" ? C.warmOrange : C.skyBlue;
const getWOColor = (s) => s === "Completato" ? C.blueGreen : s === "In corso" ? C.blueGreen : C.sunYellow;
const getPrioColor = (p) => p === "Alta" ? C.warmOrange : p === "Media" ? C.sunYellow : C.blueGreen;

const AgillaMark = ({ size = 32, color = C.white }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="48" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2.5"/>
    <circle cx="50" cy="45" r="22" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2"/>
    <ellipse cx="50" cy="48" rx="14" ry="17" fill={color} fillOpacity="0.9"/>
    <path d="M43 44 Q45 42 47 44" stroke={color === C.white ? C.deepBlue : C.white} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M53 44 Q55 42 57 44" stroke={color === C.white ? C.deepBlue : C.white} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M46 54 Q50 57 54 54" stroke={color === C.white ? C.deepBlue : C.white} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M36 35 Q28 25 32 18 Q38 28 40 35" fill={color} fillOpacity="0.7"/>
    <path d="M30 42 Q20 38 18 30 Q26 36 32 42" fill={color} fillOpacity="0.6"/>
    <path d="M64 35 Q72 25 68 18 Q62 28 60 35" fill={color} fillOpacity="0.7"/>
    <path d="M70 42 Q80 38 82 30 Q74 36 68 42" fill={color} fillOpacity="0.6"/>
    <path d="M38 32 Q50 22 62 32 Q56 28 50 27 Q44 28 38 32" fill={color} fillOpacity="0.8"/>
  </svg>
);

const WavePattern = () => (
  <svg width="100%" height="40" viewBox="0 0 390 40" preserveAspectRatio="none">
    <path d="M0 20 Q20 5 40 20 Q60 35 80 20 Q100 5 120 20 Q140 35 160 20 Q180 5 200 20 Q220 35 240 20 Q260 5 280 20 Q300 35 320 20 Q340 5 360 20 Q380 35 390 20 L390 40 L0 40Z"
      fill={C.skyBlue} fillOpacity="0.15"/>
  </svg>
);

// ── BOOKING FLOW ──────────────────────────────────────────
function BookingFlow({ onClose, onConfirm }) {
  const [step, setStep] = useState(1); // 1=zona 2=bici 3=durata 4=riepilogo 5=conferma
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedBike, setSelectedBike] = useState(null);
  const [duration, setDuration] = useState(2);
  const [plan, setPlan] = useState("orario");

  const zones = ["Passignano", "Castiglione", "Tuoro", "Magione", "Panicale"];
  const availableInZone = bikes.filter(b => b.status === "Disponibile" && b.zone === selectedZone);

  const plans = [
    { id: "orario", label: "Orario", price: 3, unit: "€/ora", icon: "⏱️" },
    { id: "mezza", label: "Mezza giornata", price: 10, unit: "4h", icon: "🌤️" },
    { id: "giornata", label: "Giornata intera", price: 18, unit: "8h", icon: "☀️" },
  ];
  const selectedPlan = plans.find(p => p.id === plan);
  const totalPrice = plan === "orario" ? duration * 3 : selectedPlan.price;

  const progressW = `${(step / 4) * 100}%`;

  return (
    <div style={{ position: "absolute", inset: 0, background: C.bgLight, zIndex: 100, display: "flex", flexDirection: "column", overflowY: "auto" }}>
      <style>{`
        .zone-card { transition: all 0.2s; cursor: pointer; }
        .zone-card:hover { transform: translateY(-2px); }
        .bike-sel { transition: all 0.2s; cursor: pointer; }
        .bike-sel:hover { transform: translateY(-2px); }
      `}</style>

      {/* Header */}
      <div style={{ background: C.deepBlue, padding: "12px 20px 16px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}><WavePattern /></div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, position: "relative", zIndex: 1 }}>
          <button onClick={step > 1 && step < 5 ? () => setStep(s => s - 1) : onClose}
            style={{ background: "none", border: "none", color: C.skyBlue, fontSize: 22, cursor: "pointer", padding: 0 }}>
            {step > 1 && step < 5 ? "←" : "✕"}
          </button>
          <div style={{ textAlign: "center" }}>
            <p style={{ color: C.skyBlue, fontSize: 10, margin: 0, letterSpacing: 2, fontFamily: "'DM Sans'" }}>PRENOTA</p>
            <p style={{ color: C.white, fontSize: 15, fontWeight: 700, margin: 0 }}>
              {step === 1 ? "Scegli la zona" : step === 2 ? "Scegli la bici" : step === 3 ? "Durata e piano" : step === 4 ? "Riepilogo" : "Prenotata!"}
            </p>
          </div>
          <div style={{ width: 30 }} />
        </div>
        {step < 5 && (
          <div style={{ height: 4, background: "rgba(255,255,255,0.15)", borderRadius: 2, overflow: "hidden", position: "relative", zIndex: 1 }}>
            <div style={{ width: progressW, height: "100%", background: C.blueGreen, borderRadius: 2, transition: "width 0.4s ease" }} />
          </div>
        )}
      </div>

      <div style={{ flex: 1, padding: "20px 18px" }}>

        {/* STEP 1 — Zona */}
        {step === 1 && (
          <div>
            <p style={{ color: C.deepBlue, fontSize: 13, marginBottom: 18, fontFamily: "'DM Sans'", opacity: 0.7 }}>
              Dove vuoi iniziare la tua avventura sul Lago Trasimeno?
            </p>
            {zones.map(zone => {
              const count = bikes.filter(b => b.status === "Disponibile" && b.zone === zone).length;
              const zoneIcons = { Passignano: "🏛️", Castiglione: "🏰", Tuoro: "⛵", Magione: "🌿", Panicale: "🍷" };
              const zoneDesc = {
                Passignano: "Vista lago, borgo medievale",
                Castiglione: "Rocca del Leone, centro storico",
                Tuoro: "Spiagge e battello per l'isola",
                Magione: "Uliveti, torre dei Lambardi",
                Panicale: "Borgo più bello d'Italia",
              };
              return (
                <div key={zone} className="zone-card"
                  onClick={() => { setSelectedZone(zone); setStep(2); }}
                  style={{
                    background: C.white, borderRadius: 16, padding: "16px", marginBottom: 10,
                    boxShadow: "0 2px 12px rgba(2,48,71,0.08)",
                    border: `1.5px solid ${count > 0 ? C.skyBlue + "50" : "#eee"}`,
                    opacity: count === 0 ? 0.5 : 1,
                    display: "flex", alignItems: "center", gap: 14
                  }}>
                  <div style={{ width: 50, height: 50, borderRadius: 25, background: `${C.blueGreen}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>
                    {zoneIcons[zone]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: C.deepBlue, fontWeight: 700, fontSize: 15, margin: 0 }}>{zone}</p>
                    <p style={{ color: "#aaa", fontSize: 11, margin: "2px 0 4px", fontFamily: "'DM Sans'" }}>{zoneDesc[zone]}</p>
                    <span style={{ color: count > 0 ? C.blueGreen : C.warmOrange, fontSize: 11, fontFamily: "'DM Sans'", fontWeight: 600 }}>
                      🚲 {count > 0 ? `${count} bici disponibili` : "Nessuna bici disponibile"}
                    </span>
                  </div>
                  <span style={{ color: C.blueGreen, fontSize: 20 }}>›</span>
                </div>
              );
            })}
          </div>
        )}

        {/* STEP 2 — Bici */}
        {step === 2 && (
          <div>
            <p style={{ color: C.deepBlue, fontSize: 13, marginBottom: 6, fontFamily: "'DM Sans'", opacity: 0.7 }}>
              Bici disponibili a <strong style={{ color: C.blueGreen }}>{selectedZone}</strong>
            </p>
            <p style={{ color: "#aaa", fontSize: 11, marginBottom: 16, fontFamily: "'DM Sans'" }}>
              Scegli la bici che preferisci 🚲
            </p>
            {availableInZone.length === 0 && (
              <div style={{ background: `${C.warmOrange}10`, border: `1px solid ${C.warmOrange}30`, borderRadius: 14, padding: 20, textAlign: "center" }}>
                <p style={{ color: C.warmOrange, fontFamily: "'DM Sans'" }}>Nessuna bici disponibile in questa zona</p>
                <button onClick={() => setStep(1)} style={{ background: C.blueGreen, border: "none", borderRadius: 10, padding: "8px 18px", color: C.white, fontSize: 13, fontFamily: "'DM Sans'", cursor: "pointer", marginTop: 8 }}>
                  ← Cambia zona
                </button>
              </div>
            )}
            {availableInZone.map(bike => (
              <div key={bike.id} className="bike-sel"
                onClick={() => { setSelectedBike(bike); setStep(3); }}
                style={{
                  background: C.white, borderRadius: 16, padding: "16px", marginBottom: 10,
                  boxShadow: "0 2px 12px rgba(2,48,71,0.08)",
                  border: `1.5px solid ${C.skyBlue}40`
                }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 26, background: `${C.blueGreen}12`, border: `2px solid ${C.blueGreen}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>🚲</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: C.deepBlue, fontWeight: 700, fontSize: 15 }}>{bike.id}</span>
                      <span style={{ color: getBattColor(bike.battery), fontWeight: 700, fontSize: 13, fontFamily: "'DM Sans'" }}>{bike.battery}% ⚡</span>
                    </div>
                    <p style={{ color: "#aaa", fontSize: 11, margin: "2px 0 6px", fontFamily: "'DM Sans'" }}>{bike.model}</p>
                    <div style={{ height: 5, background: "#eee", borderRadius: 3, overflow: "hidden", marginBottom: 6 }}>
                      <div style={{ width: `${bike.battery}%`, height: "100%", background: getBattColor(bike.battery), borderRadius: 3 }} />
                    </div>
                    <div style={{ display: "flex", gap: 12 }}>
                      <span style={{ color: C.blueGreen, fontSize: 11, fontFamily: "'DM Sans'", fontWeight: 500 }}>🛣️ Autonomia ~{bike.range} km</span>
                      <span style={{ color: "#bbb", fontSize: 11, fontFamily: "'DM Sans'" }}>📍 {bike.zone}</span>
                    </div>
                  </div>
                  <span style={{ color: C.blueGreen, fontSize: 20 }}>›</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* STEP 3 — Durata */}
        {step === 3 && selectedBike && (
          <div>
            <p style={{ color: C.deepBlue, fontSize: 13, marginBottom: 18, fontFamily: "'DM Sans'", opacity: 0.7 }}>
              Quanto vuoi pedalare oggi?
            </p>

            {/* Piano tariffario */}
            <p style={{ color: C.deepBlue, fontSize: 12, fontFamily: "'DM Sans'", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", opacity: 0.5, marginBottom: 10 }}>Piano tariffario</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
              {plans.map(p => (
                <div key={p.id} onClick={() => setPlan(p.id)}
                  style={{
                    background: plan === p.id ? C.deepBlue : C.white,
                    border: `1.5px solid ${plan === p.id ? C.deepBlue : C.skyBlue + "50"}`,
                    borderRadius: 14, padding: "14px 10px", textAlign: "center", cursor: "pointer",
                    transition: "all 0.2s",
                    boxShadow: plan === p.id ? `0 4px 16px ${C.deepBlue}30` : "0 2px 8px rgba(2,48,71,0.06)"
                  }}>
                  <div style={{ fontSize: 20, marginBottom: 6 }}>{p.icon}</div>
                  <p style={{ color: plan === p.id ? C.skyBlue : "#aaa", fontSize: 10, margin: "0 0 4px", fontFamily: "'DM Sans'" }}>{p.unit}</p>
                  <p style={{ color: plan === p.id ? C.sunYellow : C.deepBlue, fontSize: 16, fontWeight: 700, margin: "0 0 2px", fontFamily: "'DM Sans'" }}>€{p.price}</p>
                  <p style={{ color: plan === p.id ? C.white : C.deepBlue, fontSize: 11, margin: 0, fontWeight: 600 }}>{p.label}</p>
                </div>
              ))}
            </div>

            {/* Ore slider (solo se orario) */}
            {plan === "orario" && (
              <div style={{ background: C.white, borderRadius: 16, padding: 18, marginBottom: 20, boxShadow: "0 2px 10px rgba(2,48,71,0.07)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <p style={{ color: C.deepBlue, fontSize: 13, fontFamily: "'DM Sans'", fontWeight: 600, margin: 0 }}>⏱️ Durata</p>
                  <span style={{ color: C.blueGreen, fontWeight: 700, fontSize: 18, fontFamily: "'DM Sans'" }}>{duration}h</span>
                </div>
                <input type="range" min="1" max="8" value={duration} onChange={e => setDuration(+e.target.value)}
                  style={{ width: "100%", accentColor: C.blueGreen, cursor: "pointer" }} />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                  <span style={{ color: "#bbb", fontSize: 10, fontFamily: "'DM Sans'" }}>1h</span>
                  <span style={{ color: "#bbb", fontSize: 10, fontFamily: "'DM Sans'" }}>8h</span>
                </div>
              </div>
            )}

            {/* Percorsi consigliati */}
            <p style={{ color: C.deepBlue, fontSize: 12, fontFamily: "'DM Sans'", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", opacity: 0.5, marginBottom: 10 }}>Percorsi consigliati</p>
            {routes.slice(0, 2).map(r => (
              <div key={r.name} style={{ background: C.white, borderRadius: 14, padding: "12px 14px", marginBottom: 8, boxShadow: "0 2px 8px rgba(2,48,71,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ color: C.deepBlue, fontWeight: 600, fontSize: 13, margin: 0 }}>{r.name}</p>
                  <p style={{ color: "#aaa", fontSize: 11, margin: "3px 0 0", fontFamily: "'DM Sans'" }}>🛣️ {r.km} km · ⏱️ {r.duration} · {r.difficulty}</p>
                </div>
                <span style={{ color: r.difficulty === "Facile" ? C.blueGreen : C.sunYellow, fontSize: 11, fontFamily: "'DM Sans'", fontWeight: 600, background: r.difficulty === "Facile" ? `${C.blueGreen}15` : `${C.sunYellow}20`, padding: "3px 8px", borderRadius: 20 }}>{r.difficulty}</span>
              </div>
            ))}

            <button onClick={() => setStep(4)}
              style={{ width: "100%", background: C.blueGreen, border: "none", borderRadius: 14, padding: "15px", color: C.white, fontSize: 15, fontFamily: "'DM Sans'", fontWeight: 700, cursor: "pointer", marginTop: 10, boxShadow: `0 4px 16px ${C.blueGreen}40` }}>
              Continua →
            </button>
          </div>
        )}

        {/* STEP 4 — Riepilogo */}
        {step === 4 && selectedBike && (
          <div>
            <p style={{ color: C.deepBlue, fontSize: 13, marginBottom: 18, fontFamily: "'DM Sans'", opacity: 0.7 }}>
              Controlla i dettagli della tua prenotazione
            </p>

            {/* Bike summary card */}
            <div style={{ background: `linear-gradient(135deg, ${C.deepBlue}, #034a6e)`, borderRadius: 20, padding: 20, marginBottom: 16, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", right: -20, bottom: -20, opacity: 0.08 }}><AgillaMark size={120} color={C.white} /></div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16, position: "relative", zIndex: 1 }}>
                <div style={{ width: 54, height: 54, borderRadius: 27, background: `${C.blueGreen}30`, border: `2px solid ${C.blueGreen}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>🚲</div>
                <div>
                  <p style={{ color: C.white, fontWeight: 700, fontSize: 18, margin: 0 }}>{selectedBike.id}</p>
                  <p style={{ color: C.skyBlue, fontSize: 12, margin: "2px 0 0", fontFamily: "'DM Sans'" }}>{selectedBike.model} · {selectedBike.zone}</p>
                </div>
              </div>
              {[
                ["📍 Zona di ritiro", selectedBike.zone],
                ["⚡ Batteria", `${selectedBike.battery}% (~${selectedBike.range} km)`],
                ["📅 Data", "Oggi, 13 Marzo 2026"],
                ["⏱️ Piano", selectedPlan.label],
                plan === "orario" ? ["🕐 Durata", `${duration} ore`] : ["🕐 Validità", selectedPlan.unit],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 8, marginBottom: 8, position: "relative", zIndex: 1 }}>
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, fontFamily: "'DM Sans'" }}>{k}</span>
                  <span style={{ color: C.white, fontSize: 12, fontFamily: "'DM Sans'", fontWeight: 600 }}>{v}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 1, marginTop: 4 }}>
                <span style={{ color: C.skyBlue, fontSize: 14, fontFamily: "'DM Sans'", fontWeight: 600 }}>💶 Totale</span>
                <span style={{ color: C.sunYellow, fontSize: 22, fontWeight: 700, fontFamily: "'DM Sans'" }}>€{totalPrice}</span>
              </div>
            </div>

            {/* Percorsi */}
            <p style={{ color: C.deepBlue, fontSize: 12, fontFamily: "'DM Sans'", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", opacity: 0.5, marginBottom: 10 }}>Percorsi suggeriti</p>
            {routes.map(r => (
              <div key={r.name} style={{ background: C.white, borderRadius: 12, padding: "12px 14px", marginBottom: 8, boxShadow: "0 2px 8px rgba(2,48,71,0.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <p style={{ color: C.deepBlue, fontWeight: 600, fontSize: 13, margin: 0 }}>{r.name}</p>
                  <span style={{ color: r.difficulty === "Facile" ? C.blueGreen : C.sunYellow, fontSize: 10, fontFamily: "'DM Sans'", fontWeight: 600 }}>{r.difficulty}</span>
                </div>
                <p style={{ color: "#aaa", fontSize: 11, margin: 0, fontFamily: "'DM Sans'" }}>🛣️ {r.km} km · ⏱️ {r.duration} · {r.stops.join(" → ")}</p>
              </div>
            ))}

            <button onClick={() => { setStep(5); onConfirm && onConfirm(selectedBike); }}
              style={{ width: "100%", background: `linear-gradient(90deg, ${C.blueGreen}, ${C.deepBlue})`, border: "none", borderRadius: 14, padding: "16px", color: C.white, fontSize: 15, fontFamily: "'DM Sans'", fontWeight: 700, cursor: "pointer", marginTop: 4, boxShadow: `0 6px 20px ${C.blueGreen}40` }}>
              Conferma prenotazione 🚲
            </button>
          </div>
        )}

        {/* STEP 5 — Conferma */}
        {step === 5 && selectedBike && (
          <div style={{ textAlign: "center", paddingTop: 20 }}>
            {/* Success animation */}
            <div style={{ width: 100, height: 100, borderRadius: 50, background: `linear-gradient(135deg, ${C.blueGreen}, ${C.deepBlue})`, margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 8px 30px ${C.blueGreen}40` }}>
              <span style={{ fontSize: 44 }}>✓</span>
            </div>
            <h2 style={{ color: C.deepBlue, fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Prenotata!</h2>
            <p style={{ color: "#888", fontSize: 14, fontFamily: "'DM Sans'", marginBottom: 24 }}>
              La tua e-bike è pronta a <strong style={{ color: C.blueGreen }}>{selectedBike.zone}</strong>
            </p>

            {/* QR code placeholder */}
            <div style={{ background: C.white, borderRadius: 20, padding: 20, marginBottom: 20, boxShadow: "0 4px 20px rgba(2,48,71,0.1)" }}>
              <p style={{ color: C.deepBlue, fontSize: 12, fontFamily: "'DM Sans'", fontWeight: 600, marginBottom: 14, letterSpacing: 1, textTransform: "uppercase", opacity: 0.5 }}>
                Scansiona per sbloccare
              </p>
              <div style={{ width: 120, height: 120, margin: "0 auto 14px", background: "#f0f0f0", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", border: `2px solid ${C.skyBlue}40`, position: "relative" }}>
                {/* Fake QR */}
                {[...Array(6)].map((_, r) => (
                  [...Array(6)].map((_, c) => (
                    <div key={`${r}-${c}`} style={{
                      position: "absolute",
                      left: 12 + c * 17, top: 12 + r * 17,
                      width: 14, height: 14,
                      background: Math.random() > 0.4 ? C.deepBlue : "transparent",
                      borderRadius: 2
                    }} />
                  ))
                ))}
                <div style={{ position: "absolute", inset: 8, border: `3px solid ${C.deepBlue}`, borderRadius: 8 }} />
              </div>
              <p style={{ color: C.deepBlue, fontWeight: 700, fontSize: 18, fontFamily: "'DM Sans'", margin: "0 0 4px", letterSpacing: 3 }}>
                {selectedBike.id}
              </p>
              <p style={{ color: "#aaa", fontSize: 12, margin: 0, fontFamily: "'DM Sans'" }}>
                Valido fino alle {new Date(Date.now() + (plan === "orario" ? duration : plan === "mezza" ? 4 : 8) * 3600000).toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>

            {/* Info */}
            <div style={{ background: `${C.blueGreen}10`, border: `1px solid ${C.blueGreen}30`, borderRadius: 14, padding: 14, marginBottom: 20, textAlign: "left" }}>
              {[
                ["📍", `Ritira in ${selectedBike.zone}`],
                ["⚡", `Batteria ${selectedBike.battery}% — ${selectedBike.range} km autonomia`],
                ["💶", `Totale pagato: €${totalPrice}`],
                ["🔔", "Riceverai una notifica 15 min prima della scadenza"],
              ].map(([icon, text]) => (
                <div key={text} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 14 }}>{icon}</span>
                  <span style={{ color: C.deepBlue, fontSize: 12, fontFamily: "'DM Sans'" }}>{text}</span>
                </div>
              ))}
            </div>

            <button onClick={onClose}
              style={{ width: "100%", background: C.deepBlue, border: "none", borderRadius: 14, padding: "15px", color: C.white, fontSize: 15, fontFamily: "'DM Sans'", fontWeight: 700, cursor: "pointer", boxShadow: `0 4px 16px ${C.deepBlue}30` }}>
              Torna alla home 🌊
            </button>
            <p style={{ color: "#aaa", fontSize: 11, fontFamily: "'DM Sans'", fontStyle: "italic", marginTop: 16 }}>
              Ogni curva racconta una storia. Scrivila con noi.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
