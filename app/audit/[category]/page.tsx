import { AUDIT_CATEGORIES } from "@/lib/data/checklists";
import AuditCategoryClient from "./AuditCategoryClient";

export function generateStaticParams() {
  return AUDIT_CATEGORIES.map((cat) => ({ category: cat.key }));
}

export default function AuditCategoryPage({ params }: { params: { category: string } }) {
  return <AuditCategoryClient categoryKey={params.category} />;
}
