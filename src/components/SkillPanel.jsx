import { useState, memo, useCallback } from "react";
import { skillBadge, getPrimaryType } from "../utils/Skill.js";
import SkillbookModal from "./SkillBookModal.jsx";

const EquippedSkillRow = memo(function EquippedSkillRow({ skill, mp, maxMp, exhaustion, onUse }) {
  const canUse = !skill.is_passive && mp >= skill.mp_cost && exhaustion + skill.exhaustion_cost <= 100;
  const badge = skillBadge(skill);
  const primary = skill.type ? getPrimaryType(skill.type) : null;

  return (
    <div className={`equipped-skill-row ${skill.is_passive ? "passive" : ""}`}>
      <div className={`skill-badge sm ${skill.is_passive ? "passive" : "active"}`}>{badge}</div>
      <div className="skill-info">
        <div className="skill-name sm">
          {skill.name || "Unnamed"}
          {skill.skill_mastery > 0 && <span className="skill-mastery-badge">×{skill.skill_mastery}</span>}
        </div>
        <div className="skill-inline-meta">
          {primary && skill.type && <span className="skill-type-pill">{primary} · {skill.type}</span>}
          {!skill.is_passive && (
            <>
              {skill.mp_cost > 0 && <span className="skill-cost-pill mp">{skill.mp_cost}MP</span>}
              {skill.exhaustion_cost > 0 && <span className="skill-cost-pill exh">{skill.exhaustion_cost}%</span>}
            </>
          )}
        </div>
      </div>
      {!skill.is_passive && (
        <button
          className="skill-use-btn"
          onClick={onUse}
          disabled={!canUse}
          title={
            exhaustion + skill.exhaustion_cost > 100 ? "Would exceed 100% exhaustion" :
            mp < skill.mp_cost ? `Not enough MP (need ${skill.mp_cost})` :
            `Use: −${skill.mp_cost} MP, +${skill.exhaustion_cost}% exhaustion`
          }
        >
          Use
        </button>
      )}
    </div>
  );
});

export default function SkillPanel({
  skillset, equippedSkills, mp, maxMp, exhaustion,
  onSkillsetChange, onEquippedChange, onCharUpdate,
}) {
  const [bookOpen, setBookOpen] = useState(false);

  const equippedSkillObjects = equippedSkills
    .map(id => skillset.find(s => s.id === id))
    .filter(Boolean);

  const handleUse = useCallback((skill) => {
    const newMp = Math.max(0, mp - skill.mp_cost);
    const newExhaustion = Math.min(100, exhaustion + skill.exhaustion_cost);
    const newSkillset = skillset.map(s =>
      s.id === skill.id ? { ...s, skill_mastery: (s.skill_mastery ?? 0) + 1 } : s
    );
    onCharUpdate({ mp: newMp, exhaustion: newExhaustion });
    onSkillsetChange(newSkillset);
  }, [mp, exhaustion, skillset, onCharUpdate, onSkillsetChange]);

  const passives = equippedSkillObjects.filter(s => s.is_passive);
  const actives  = equippedSkillObjects.filter(s => !s.is_passive);

  return (
    <div className="card">
      <div className="inv-header">
        <div className="section-title" style={{ marginBottom: 0 }}>
          Skills
          <span className="skill-slot-count">{equippedSkills.length}/12</span>
        </div>
        <button className="inv-add-btn" onClick={() => setBookOpen(true)}>⚡ Skillbook</button>
      </div>

      {equippedSkillObjects.length === 0 ? (
        <div className="inv-empty">No skills equipped. Open Skillbook to equip.</div>
      ) : (
        <div className="equipped-skill-list">
          {actives.length > 0 && (
            <>
              <div className="skill-group-label">Active</div>
              {actives.map(skill => (
                <EquippedSkillRow
                  key={skill.id}
                  skill={skill}
                  mp={mp}
                  maxMp={maxMp}
                  exhaustion={exhaustion}
                  onUse={() => handleUse(skill)}
                />
              ))}
            </>
          )}
          {passives.length > 0 && (
            <>
              <div className="skill-group-label">Passive</div>
              {passives.map(skill => (
                <EquippedSkillRow
                  key={skill.id}
                  skill={skill}
                  mp={mp}
                  maxMp={maxMp}
                  exhaustion={exhaustion}
                  onUse={() => handleUse(skill)}
                />
              ))}
            </>
          )}
        </div>
      )}

      {bookOpen && (
        <SkillbookModal
          skillset={skillset}
          equippedSkills={equippedSkills}
          onSkillsetChange={onSkillsetChange}
          onEquippedChange={onEquippedChange}
          onClose={() => setBookOpen(false)}
        />
      )}
    </div>
  );
}