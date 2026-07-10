"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24 px-6">
      <span className="text-4xl mb-3">🔌</span>
      <p className="font-display font-bold text-paper text-lg">Halaman tidak ditemukan</p>
      <p className="text-sm text-muted mt-1 mb-5">Sepertinya koneksi ke halaman ini terputus.</p>
      <Link href="/" className="text-sm font-semibold bg-brand text-white rounded-xl2 px-5 py-2.5">
        Kembali ke Dashboard
      </Link>
    </div>
  );
}
