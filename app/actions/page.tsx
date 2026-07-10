"use client";
import { useAppData } from "@/lib/store";
import { PageHeader, HubLink } from "@/components/ui";

export default function ActionsHubPage() {
  const { topDecision, actionPlan, progress } = useAppData();
  const pending = actionPlan.filter((a) => a.status !== "Selesai").length;

  return (
    <div className="space-y-5">
      <PageHeader title="Diagnose → Decide → Act → Verify" subtitle="Tindak lanjuti hasil audit Anda." />
      <div className="space-y-3">
        <HubLink href="/actions/ai-diagnosis" icon="🤖" title="AI Diagnosis Prompt" desc="Prompt siap copy-paste ke ChatGPT/Claude" />
        <HubLink href="/actions/decision" icon="⚖️" title="Decision Engine" desc={topDecision.recommendation} />
        <HubLink href="/actions/plan" icon="🛠" title="Action Plan" desc={`${pending} tindakan belum selesai`} />
        <HubLink href="/actions/verification" icon="🔁" title="Verification" desc="Bandingkan sebelum & sesudah tindakan" />
        <HubLink href="/actions/progress" icon="📈" title="Progress Tracker" desc={`${progress.length} histori audit tersimpan`} />
      </div>
    </div>
  );
}
