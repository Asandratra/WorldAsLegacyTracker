import { useState, memo, useCallback } from "react";
import { skillBadge, getPrimaryType, MAX_EQUIPPED_SKILLS } from "../utils/Skill.js";
import AddSkillModal from "./AddSkillModal.jsx";

function SkillCosts({ skill }) {
  const parts = [];
  if (skill.mp_cost > 0) parts.push(`${skill.mp_cost} MP`);
  if (skill.exhaustion_cost > 0) parts.push(`${skill.exhaustion_cost}% EXH`);
  if (!skill.is_passive && skill.time_unit > 0) parts.push(`${skill.time_unit}t`);
  return parts.length
    ? <div className="skill-costs">{parts.join(" · ")}</div>
    : null;
}

function SkillMeta({ skill }) {
  if (skill.is_passive) return <div className="skill-meta-tag passive">Passive</div>;
  const primary = getPrimaryType(skill.type);
  return (
    <div className="skill-meta-row">
      {skill.type && (
        <div className="skill-meta-tag type">
          {primary && <span className="skill-meta-primary">{primary} /</span>} {skill.type}
        </div>
      )}
      {skill.base_power != null && (
        <div className="skill-meta-tag power">PWR {skill.base_power}</div>
      )}
    </div>
  );
}

const SkillRow = memo(function SkillRow({ skill, isEquipped, canEquip, onEquip, onUnequip, onDelete }) {
  const badge = skillBadge(skill);

  return (
    <div className={`skill-row ${isEquipped ? "equipped" : ""}`}>
      <div className={`skill-badge ${skill.is_passive ? "passive" : "active"}`}>{badge}</div>
      <div className="skill-info">
        <div className="skill-name">
          {skill.name || "Unnamed"}
          {skill.skill_mastery > 0 && (
            <span className="skill-mastery-badge">×{skill.skill_mastery}</span>
          )}
        </div>
        {skill.description && <div className="skill-desc">{skill.description}</div>}
        <SkillMeta skill={skill} />
        <SkillCosts skill={skill} />
      </div>
      <div className="skill-row-actions">
        {isEquipped ? (
          <button className="skill-action-btn unequip" onClick={onUnequip} title="Unequip skill">−</button>
        ) : (
          <button
            className="skill-action-btn equip"
            onClick={onEquip}
            disabled={!canEquip}
            title={canEquip ? "Equip skill" : "Skill slots full (12/12)"}
          >+</button>
        )}
        <button className="skill-action-btn delete" onClick={onDelete} title="Delete skill">✕</button>
      </div>
    </div>
  );
});

export default function SkillbookModal({ skillset, equippedSkills, onSkillsetChange, onEquippedChange, onClose }) {
  const [addOpen, setAddOpen] = useState(false);
  const [filter, setFilter] = useState("all"); // "all" | "equipped" | "learnt"

  const equippedSet = new Set(equippedSkills);
  const canEquipMore = equippedSkills.length < MAX_EQUIPPED_SKILLS;

  const addSkill = useCallback((skill) => {
    onSkillsetChange([...skillset, skill]);
  }, [skillset, onSkillsetChange]);

  const deleteSkill = useCallback((id) => {
    onSkillsetChange(skillset.filter(s => s.id !== id));
    onEquippedChange(equippedSkills.filter(eid => eid !== id));
  }, [skillset, equippedSkills, onSkillsetChange, onEquippedChange]);

  const equipSkill = useCallback((id) => {
    if (equippedSkills.length >= MAX_EQUIPPED_SKILLS) return;
    onEquippedChange([...equippedSkills, id]);
  }, [equippedSkills, onEquippedChange]);

  const unequipSkill = useCallback((id) => {
    onEquippedChange(equippedSkills.filter(eid => eid !== id));
  }, [equippedSkills, onEquippedChange]);

  const visibleSkills = skillset.filter(s => {
    if (filter === "equipped") return equippedSet.has(s.id);
    if (filter === "learnt") return !equippedSet.has(s.id);
    return true;
  });

  return (
    <>
      <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
        <div className="modal skillbook-modal">
          {/* Header */}
          <div className="skillbook-header">
            <div className="modal-title" style={{ marginBottom: 0 }}>Skillbook</div>
            <div className="skillbook-counter">
              {equippedSkills.length} / {MAX_EQUIPPED_SKILLS} equipped
            </div>
          </div>

          {/* Filter tabs */}
          <div className="modal-kind-tabs" style={{ marginTop: 12 }}>
            {[["all", "All"], ["equipped", "Equipped"], ["learnt", "Learnt"]].map(([v, l]) => (
              <button
                key={v}
                className={`modal-kind-tab ${filter === v ? "active" : ""}`}
                onClick={() => setFilter(v)}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Skill list */}
          <div className="skillbook-list">
            {visibleSkills.length === 0 ? (
              <div className="inv-empty">
                {filter === "equipped" ? "No skills equipped yet." : "No skills learnt yet."}
              </div>
            ) : (
              visibleSkills.map(skill => (
                <SkillRow
                  key={skill.id}
                  skill={skill}
                  isEquipped={equippedSet.has(skill.id)}
                  canEquip={canEquipMore}
                  onEquip={() => equipSkill(skill.id)}
                  onUnequip={() => unequipSkill(skill.id)}
                  onDelete={() => deleteSkill(skill.id)}
                />
              ))
            )}
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button className="btn primary" onClick={() => setAddOpen(true)}>+ Learn Skill</button>
            <button className="btn" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>

      {addOpen && (
        <AddSkillModal onAdd={addSkill} onClose={() => setAddOpen(false)} />
      )}
    </>
  );
}