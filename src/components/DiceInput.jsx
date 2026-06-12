import { memo } from "react";

/**
 * Renders two compact number inputs for a NdF dice value.
 * value: { count, faces }
 * onChange: (newValue) => void
 */
const DiceInput = memo(function DiceInput({ value = { count: 0, faces: 6 }, onChange, disabled }) {
  const set = (field, raw) => {
    const n = Math.max(0, parseInt(raw) || 0);
    onChange({ ...value, [field]: n });
  };

  return (
    <div className="dice-input-row">
      <input
        className="dice-input-count"
        type="number" min={0} max={99}
        value={value.count}
        disabled={disabled}
        onChange={e => set("count", e.target.value)}
      />
      <span className="dice-input-sep">d</span>
      <input
        className="dice-input-faces"
        type="number" min={1} max={100}
        value={value.faces}
        disabled={disabled}
        onChange={e => set("faces", Math.max(1, parseInt(e.target.value) || 1))}
      />
    </div>
  );
});

export default DiceInput;