import { useState, memo, useCallback } from "react";
import { skillBadge, getPrimaryType, techStatBonus } from "../utils/Skill.js";
import { fmtPower } from "../utils/Inventory.js";
import SkillbookModal from "./SkillBookModal.jsx";

const SkillCell = memo(function SkillCell({ skill, mp, exhaustion, max_exhaustion, tech_stats, onUse }) {
  const canUse    = !skill.is_passive && mp >= skill.mp_cost && exhaustion + skill.exhaustion_cost <= max_exhaustion;
  const badge     = skillBadge(skill);
  const primary   = skill.type ? getPrimaryType(skill.type) : null;
  const techKey   = skill.type?.toLowerCase();
  const techBonus = techKey && tech_stats ? techStatBonus(tech_stats[techKey] ?? 0) : 0;

  return (
    <div className={`skill-cell ${skill.is_passive ? "passive" : "active"} ${canUse || skill.is_passive ? "" : "depleted"}`}>
      <div className="skill-cell-top">
        <div className={`skill-badge sm ${skill.is_passive ? "passive" : "active"}`}>{badge}</div>
        <div className="skill-cell-name">{skill.name || "Unnamed"}</div>
        {skill.skill_mastery > 0 && (
          <span className="skill-mastery-badge">×{skill.skill_mastery}</span>
        )}
      </div>

      <div className="skill-cell-meta">
        {primary && skill.type && (
          <span className="skill-type-pill">{skill.type}</span>
        )}
        {!skill.is_passive && (
          <>
            {skill.mp_cost > 0         && <span className="skill-cost-pill mp">{skill.mp_cost} MP</span>}
            {skill.exhaustion_cost > 0 && <span className="skill-cost-pill exh">{skill.exhaustion_cost} EXH</span>}
            {skill.base_power?.count > 0 && <span className="skill-cost-pill pwr">{fmtPower(skill.base_power)} PWR</span>}
            {techBonus > 0 && <span className="skill-cost-pill tech">+{techBonus}d</span>}
          </>
        )}
      </div>

      {!skill.is_passive && (
        <button
          className="skill-use-btn full"
          onClick={onUse}
          disabled={!canUse}
          title={
            exhaustion + skill.exhaustion_cost > 100 ? "Would exceed exhaustion" :
            mp < skill.mp_cost ? `Not enough MP (need ${skill.mp_cost})` :
            `Use: −${skill.mp_cost} MP, +${skill.exhaustion_cost} exhaustion`
          }
        >
          Use
        </button>
      )}
      {skill.is_passive && (
        <div className="skill-passive-indicator">Passive</div>
      )}
    </div>
  );
});

/* Fallback list row used on mobile where grid is collapsed */
const SkillListRow = memo(function SkillListRow({ skill, mp, exhaustion, max_exhaustion, tech_stats, onUse }) {
  const canUse    = !skill.is_passive && mp >= skill.mp_cost && exhaustion + skill.exhaustion_cost <= max_exhaustion;
  const badge     = skillBadge(skill);
  const primary   = skill.type ? getPrimaryType(skill.type) : null;
  const techKey   = skill.type?.toLowerCase();
  const techBonus = techKey && tech_stats ? techStatBonus(tech_stats[techKey] ?? 0) : 0;

  return (
    <div className={`equipped-skill-row ${skill.is_passive ? "passive" : ""}`}>
      <div className={`skill-badge sm ${skill.is_passive ? "passive" : "active"}`}>{badge}</div>
      <div className="skill-info">
        <div className="skill-name sm">
          {skill.name || "Unnamed"}
          {skill.skill_mastery > 0 && <span className="skill-mastery-badge">×{skill.skill_mastery}</span>}
        </div>
        {skill.description && (
          <div className="skill-desc">
            {skill.description}
          </div>
        )}
        <div className="skill-inline-meta">
          {primary && skill.type && <span className="skill-type-pill">{primary} · {skill.type}</span>}
          {!skill.is_passive && (
            <>
              {skill.mp_cost > 0         && <span className="skill-cost-pill mp">{skill.mp_cost}MP</span>}
              {skill.exhaustion_cost > 0 && <span className="skill-cost-pill exh">{skill.exhaustion_cost}</span>}
            </>
          )}
        </div>
      </div>
      {!skill.is_passive && (
        <button className="skill-use-btn" onClick={onUse} disabled={!canUse}>Use</button>
      )}
    </div>
  );
});

export default function SkillPanel({
  skillset, equippedSkills, mp, exhaustion, maxExhaustion, tech_stats,
  onSkillUse, onSkillsetChange, onEquippedChange,
}) {
  const [bookOpen, setBookOpen] = useState(false);

  const equippedObjs = equippedSkills
    .map(id => skillset.find(s => s.id === id))
    .filter(Boolean);

  // Single atomic call — CharacterSheet applies mp, exhaustion, tech_stat and
  // skill_mastery all in one onChange, preventing stale-closure double-writes.
  const handleUse = useCallback((skill) => {
    onSkillUse(skill, skillset);
  }, [skillset, onSkillUse]);

  // Pad to 12 cells so the grid always shows all slots
  const cells = [...equippedObjs];
  while (cells.length < 12) cells.push(null);

  return (
    <div className="card skill-panel-card">
      <div className="inv-header">
        <div className="section-title" style={{ marginBottom: 0 }}>
          Skills
          <span className="skill-slot-count">{equippedSkills.length}/12</span>
        </div>
        <button className="inv-add-btn" onClick={() => setBookOpen(true)}>⚡ Skillbook</button>
      </div>

      {/* Desktop 6×2 grid */}
      <div className="skill-grid-6x2">
        {cells.map((skill, i) =>
          skill ? (
            <SkillCell
              key={skill.id}
              skill={skill}
              mp={mp}
              exhaustion={exhaustion}
              max_exhaustion={maxExhaustion}
              tech_stats={tech_stats}
              onUse={() => handleUse(skill)}
            />
          ) : (
            <div key={`empty-${i}`} className="skill-cell empty">
              <div className="skill-cell-empty-label">—</div>
            </div>
          )
        )}
      </div>

      {/* Mobile fallback list */}
      <div className="skill-list-mobile">
        {equippedObjs.length === 0 ? (
          <div className="inv-empty">No skills equipped. Open Skillbook to equip.</div>
        ) : (
          equippedObjs.map(skill => (
            <SkillListRow
              key={skill.id}
              skill={skill}
              mp={mp}
              exhaustion={exhaustion}
              max_exhaustion={maxExhaustion}
              tech_stats={tech_stats}
              onUse={() => handleUse(skill)}
            />
          ))
        )}
      </div>

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