import { useState } from "react";
import { EMOJIS } from "../utils/Character.js";

export default function EmojiPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <div className="char-avatar" onClick={() => setOpen(o => !o)}>
        {value}
      </div>
      {open && (
        <div style={{
          position: "absolute", top: 56, left: 0, zIndex: 10,
          background: "var(--card)", border: "1px solid var(--border)",
          borderRadius: 4, padding: 8, display: "grid",
          gridTemplateColumns: "repeat(4,1fr)", gap: 4, width: 140
        }}>
          {EMOJIS.map(e => (
            <div
              key={e}
              style={{ cursor: "pointer", textAlign: "center", fontSize: 20, padding: 3 }}
              onClick={() => { onChange(e); setOpen(false); }}
            >
              {e}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}