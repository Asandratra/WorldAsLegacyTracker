import { modifier } from "../utils/Character.js";

export default function StatBox({ label, value, onChange }) {
  return (
    <div className="stat-box">
      <span className="label">{label}</span>
      <input
        type="number"
        value={value}
        onChange={e => onChange(parseInt(e.target.value) || 0)}
      />
      <div className="stat-modifier">{modifier(value)}</div>
    </div>
  );
}