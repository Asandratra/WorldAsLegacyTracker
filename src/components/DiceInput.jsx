import { memo } from "react";
import { DICE_TYPES } from "../utils/Character";

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
      <select
        className="dice-input-faces"
        value={value.faces}
        disabled={disabled}
        onChange={e => set("faces", Math.max(4, parseInt(e.target.value) || 1))}
      >
        {DICE_TYPES.map(faces => 
          <option key={faces} value={faces}>{faces}</option>
        )}
      </select>
    </div>
  );
});

export default DiceInput;