"use client";
import React, { createContext, useContext, useMemo } from "react";
import { useLocalStorage, newId } from "./hooks/useLocalStorage";
import { AUDIT_CATEGORIES } from "./data/checklists";
import {
  SEED_ASSETS,
  SEED_TOPOLOGY,
  SEED_CONFIG_BACKUP,
  SEED_CHANGE_LOG,
  DEFAULT_ACTION_PLAN,
  SEED_PROGRESS,
} from "./data/seedData";
import { emptyAnswers, subScoreFor, healthScoreFrom, gradeFor, computeGaps, AnswersState } from "./scoring";
import { getTopDecision } from "./data/troubleshooting";
import {
  AssetRow,
  TopologyRow,
  ConfigBackupRow,
  ChangeLogRow,
  ActionItem,
  ProgressEntry,
  AuditKey,
  Answer,
} from "./types";

interface AppDataContextValue {
  hydrated: boolean;
  answers: AnswersState;
  setAnswer: (cat: AuditKey, itemId: string, val: Answer) => void;
  resetAudit: () => void;

  assets: AssetRow[];
  setAssets: (v: AssetRow[] | ((p: AssetRow[]) => AssetRow[])) => void;

  topology: TopologyRow[];
  setTopology: (v: TopologyRow[] | ((p: TopologyRow[]) => TopologyRow[])) => void;

  configBackup: ConfigBackupRow[];
  setConfigBackup: (v: ConfigBackupRow[] | ((p: ConfigBackupRow[]) => ConfigBackupRow[])) => void;

  changeLog: ChangeLogRow[];
  setChangeLog: (v: ChangeLogRow[] | ((p: ChangeLogRow[]) => ChangeLogRow[])) => void;

  actionPlan: ActionItem[];
  setActionPlan: (v: ActionItem[] | ((p: ActionItem[]) => ActionItem[])) => void;

  progress: ProgressEntry[];
  setProgress: (v: ProgressEntry[] | ((p: ProgressEntry[]) => ProgressEntry[])) => void;

  selectedGejala: string;
  setSelectedGejala: (v: string) => void;

  // computed
  subScores: Record<AuditKey, number>;
  healthScore: number;
  grade: ReturnType<typeof gradeFor>;
  gaps: ReturnType<typeof computeGaps>;
  gapCount: number;
  gapScore: number;
  topDecision: ReturnType<typeof getTopDecision>;

  saveSnapshotToProgress: (note?: string) => void;

  baseline: BaselineSnapshot | null;
  setBaselineNow: () => void;
  clearBaseline: () => void;

  exportData: () => void;
  importData: (json: string) => boolean;
}

export interface BaselineSnapshot {
  date: string;
  assetScore: number;
  topologyScore: number;
  configScore: number;
  standardScore: number;
  healthScore: number;
}

const STORAGE_KEYS = [
  "netdoc_answers",
  "netdoc_assets",
  "netdoc_topology",
  "netdoc_configbackup",
  "netdoc_changelog",
  "netdoc_actionplan",
  "netdoc_progress",
  "netdoc_gejala",
  "netdoc_baseline",
];

const AppDataContext = createContext<AppDataContextValue | null>(null);

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const [answers, setAnswers, h1] = useLocalStorage<AnswersState>("netdoc_answers", emptyAnswers());
  const [assets, setAssets, h2] = useLocalStorage<AssetRow[]>("netdoc_assets", SEED_ASSETS);
  const [topology, setTopology, h3] = useLocalStorage<TopologyRow[]>("netdoc_topology", SEED_TOPOLOGY);
  const [configBackup, setConfigBackup, h4] = useLocalStorage<ConfigBackupRow[]>("netdoc_configbackup", SEED_CONFIG_BACKUP);
  const [changeLog, setChangeLog, h5] = useLocalStorage<ChangeLogRow[]>("netdoc_changelog", SEED_CHANGE_LOG);
  const [actionPlan, setActionPlan, h6] = useLocalStorage<ActionItem[]>("netdoc_actionplan", DEFAULT_ACTION_PLAN);
  const [progress, setProgress, h7] = useLocalStorage<ProgressEntry[]>("netdoc_progress", SEED_PROGRESS);
  const [selectedGejala, setSelectedGejala, h8] = useLocalStorage<string>("netdoc_gejala", "g0");
  const [baseline, setBaseline, h9] = useLocalStorage<BaselineSnapshot | null>("netdoc_baseline", null);

  const hydrated = h1 && h2 && h3 && h4 && h5 && h6 && h7 && h8 && h9;

  const setAnswer = (cat: AuditKey, itemId: string, val: Answer) => {
    setAnswers((prev) => ({ ...prev, [cat]: { ...prev[cat], [itemId]: val } }));
  };

  const resetAudit = () => {
    setAnswers(emptyAnswers());
  };

  const subScores = useMemo(() => {
    const s = {} as Record<AuditKey, number>;
    AUDIT_CATEGORIES.forEach((cat) => {
      s[cat.key] = subScoreFor(cat.key, answers);
    });
    return s;
  }, [answers]);

  const healthScore = useMemo(() => healthScoreFrom(subScores), [subScores]);
  const grade = useMemo(() => gradeFor(healthScore), [healthScore]);
  const gaps = useMemo(() => computeGaps(assets), [assets]);
  const gapCount = gaps.length;
  const gapScore = useMemo(() => {
    if (assets.length === 0) return 100;
    return Math.round(100 - (gapCount / assets.length) * 100);
  }, [assets.length, gapCount]);

  const topDecision = useMemo(
    () =>
      getTopDecision({
        assetScore: subScores.asset ?? 0,
        topologyScore: subScores.topology ?? 0,
        configScore: subScores.config ?? 0,
        standardScore: subScores.standard ?? 0,
        healthScore,
        gapCount,
      }),
    [subScores, healthScore, gapCount]
  );

  const saveSnapshotToProgress = (note?: string) => {
    const entry: ProgressEntry = {
      id: newId("pg"),
      date: new Date().toISOString().slice(0, 10),
      healthScore,
      subScores: `${subScores.asset}/${subScores.topology}/${subScores.config}/${subScores.standard}`,
      mainIssue: gaps[0]?.deviceName ? `Gap: ${gaps[0].deviceName} (${gaps[0].gapType})` : "-",
      actionTaken: "Snapshot otomatis",
      status: "Berjalan",
      note: note ?? "-",
    };
    setProgress((prev) => [...prev, entry]);
  };

  const setBaselineNow = () => {
    setBaseline({
      date: new Date().toISOString().slice(0, 10),
      assetScore: subScores.asset,
      topologyScore: subScores.topology,
      configScore: subScores.config,
      standardScore: subScores.standard,
      healthScore,
    });
  };
  const clearBaseline = () => setBaseline(null);

  const exportData = () => {
    const dump: Record<string, unknown> = {};
    STORAGE_KEYS.forEach((k) => {
      const raw = window.localStorage.getItem(k);
      if (raw != null) dump[k] = JSON.parse(raw);
    });
    const blob = new Blob([JSON.stringify(dump, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `netdoc-ai-os-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (json: string): boolean => {
    try {
      const parsed = JSON.parse(json);
      STORAGE_KEYS.forEach((k) => {
        if (parsed[k] !== undefined) {
          window.localStorage.setItem(k, JSON.stringify(parsed[k]));
        }
      });
      window.location.reload();
      return true;
    } catch {
      return false;
    }
  };

  const value: AppDataContextValue = {
    hydrated,
    answers,
    setAnswer,
    resetAudit,
    assets,
    setAssets,
    topology,
    setTopology,
    configBackup,
    setConfigBackup,
    changeLog,
    setChangeLog,
    actionPlan,
    setActionPlan,
    progress,
    setProgress,
    selectedGejala,
    setSelectedGejala,
    subScores,
    healthScore,
    grade,
    gaps,
    gapCount,
    gapScore,
    topDecision,
    saveSnapshotToProgress,
    baseline,
    setBaselineNow,
    clearBaseline,
    exportData,
    importData,
  };

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData must be used within AppDataProvider");
  return ctx;
}
