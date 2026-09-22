import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowLeft, Phone, X } from "lucide-react";
import { appointmentService } from "../lib/appointments";
import { cn } from "../lib/utils";
import { business } from "../data/business";
import type { Appointment, AppointmentStatus } from "../types";

const STATUS_STYLES: Record<AppointmentStatus, string> = {
  NEW: "bg-blue-bright/15 text-blue-bright",
  CONTACTED: "bg-amber-500/15 text-amber-400",
  CONFIRMED: "bg-emerald-500/15 text-emerald-400",
  COMPLETED: "bg-white/10 text-white/70",
  CANCELLED: "bg-red-500/15 text-red-400",
};

function isSameDay(iso: string, ref: Date): boolean {
  const d = new Date(iso);
  return d.toDateString() === ref.toDateString();
}

function isThisWeek(iso: string, ref: Date): boolean {
  const d = new Date(iso);
  const start = new Date(ref);
  start.setDate(ref.getDate() - ref.getDay());
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(start.getDate() + 7);
  return d >= start && d < end;
}

export function Admin() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Appointment | null>(null);

  useEffect(() => {
    appointmentService
      .list()
      .then(setAppointments)
      .finally(() => setLoading(false));
  }, []);

  const now = useMemo(() => new Date(), []);
  const stats = useMemo(
    () => ({
      newCount: appointments.filter((a) => a.status === "NEW").length,
      today: appointments.filter((a) => isSameDay(a.createdAt, now)).length,
      thisWeek: appointments.filter((a) => isThisWeek(a.createdAt, now)).length,
    }),
    [appointments, now],
  );

  async function setStatus(id: string, status: AppointmentStatus) {
    await appointmentService.updateStatus(id, status);
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    setSelected((prev) => (prev && prev.id === id ? { ...prev, status } : prev));
  }

  return (
    <div className="min-h-screen bg-bg pb-20 text-white">
      <header className="border-b border-white/10 bg-surface">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <div>
            <Link to="/" className="flex items-center gap-2 text-sm text-muted hover:text-white">
              <ArrowLeft className="h-4 w-4" /> Back to site
            </Link>
            <h1 className="mt-2 font-heading text-xl font-semibold tracking-wide">Appointment Requests — Demo Admin</h1>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 pt-4 sm:px-8">
        <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">
          <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
          <p>
            This is a demo of a future admin dashboard. D's Spotless does not currently use this system —
            appointment requests are stored locally in this browser only.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 pt-6 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard label="New Requests" value={stats.newCount} />
          <StatCard label="Today" value={stats.today} />
          <StatCard label="This Week" value={stats.thisWeek} />
        </div>

        <div className="mt-8 overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03] text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Vehicle</th>
                <th className="px-4 py-3">Package</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted">
                    Loading...
                  </td>
                </tr>
              )}
              {!loading && appointments.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted">
                    No appointment requests yet. Submit one from the Book page to see it here.
                  </td>
                </tr>
              )}
              {appointments.map((a) => (
                <tr
                  key={a.id}
                  className="cursor-pointer border-b border-white/5 hover:bg-white/[0.03]"
                  onClick={() => setSelected(a)}
                >
                  <td className="px-4 py-3">{a.name || "—"}</td>
                  <td className="px-4 py-3">
                    {[a.vehicleYear, a.vehicleMake, a.vehicleModel].filter(Boolean).join(" ") || "—"}
                  </td>
                  <td className="px-4 py-3 capitalize">{a.package || "—"}</td>
                  <td className="px-4 py-3">{a.preferredDate || "—"}</td>
                  <td className="px-4 py-3 capitalize">{a.preferredTime || "—"}</td>
                  <td className="px-4 py-3">
                    <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", STATUS_STYLES[a.status])}>
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="h-full w-full max-w-md overflow-y-auto rounded-xl border border-white/10 bg-surface p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg font-semibold tracking-wide">{selected.name}</h2>
              <button onClick={() => setSelected(null)} aria-label="Close" className="text-muted hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <dl className="mt-6 space-y-3 text-sm">
              <Row label="Phone" value={selected.phone} />
              <Row label="Email" value={selected.email} />
              <Row label="Vehicle" value={[selected.vehicleYear, selected.vehicleMake, selected.vehicleModel].filter(Boolean).join(" ")} />
              <Row label="Vehicle Type" value={selected.vehicleType} />
              <Row label="Package" value={selected.package} />
              <Row label="Add-ons" value={selected.addOns.join(", ") || "None"} />
              <Row label="Date" value={selected.preferredDate} />
              <Row label="Time" value={selected.preferredTime} />
              <Row label="Notes" value={selected.notes || "None"} />
              <Row label="Marketing opt-in" value={selected.marketingOptIn ? "Yes" : "No"} />
              <Row label="Submitted" value={new Date(selected.createdAt).toLocaleString()} />
            </dl>

            <div className="mt-6 grid grid-cols-2 gap-2">
              <a
                href={`tel:${selected.phone}`}
                className="flex items-center justify-center gap-2 rounded-lg border border-white/15 py-2.5 text-sm hover:border-white/30"
              >
                <Phone className="h-4 w-4" /> Contact
              </a>
              <button
                onClick={() => setStatus(selected.id, "CONFIRMED")}
                className="rounded-lg bg-blue py-2.5 text-sm font-medium hover:bg-blue-bright"
              >
                Confirm
              </button>
              <button
                onClick={() => setStatus(selected.id, "COMPLETED")}
                className="rounded-lg border border-white/15 py-2.5 text-sm hover:border-white/30"
              >
                Mark Completed
              </button>
              <button
                onClick={() => setStatus(selected.id, "CANCELLED")}
                className="rounded-lg border border-red-500/30 py-2.5 text-sm text-red-400 hover:bg-red-500/10"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <p className="mt-10 text-center text-xs text-muted">{business.legalName} — internal demo, not customer facing.</p>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-surface p-5">
      <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-2 font-heading text-3xl font-semibold tracking-wide">{value}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex justify-between gap-4 border-b border-white/5 pb-3">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right capitalize text-white/90">{value || "—"}</dd>
    </div>
  );
}
