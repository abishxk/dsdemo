import { supabase, isSupabaseConfigured } from "./supabase";
import { generateId } from "./utils";
import type { Appointment, AppointmentInput, AppointmentStatus } from "../types";

const STORAGE_KEY = "ds-spotless-appointments";

function readLocal(): Appointment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Appointment[]) : [];
  } catch {
    return [];
  }
}

function writeLocal(appointments: Appointment[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  } catch {
    // localStorage unavailable (private mode, etc.) — silently no-op.
  }
}

/**
 * Supabase-ready appointment service. If Supabase env vars are configured
 * it reads/writes the `appointments` table; otherwise it falls back to
 * localStorage so the demo works without a backend.
 */
export const appointmentService = {
  async create(input: AppointmentInput): Promise<Appointment> {
    const appointment: Appointment = {
      ...input,
      id: generateId(),
      status: "NEW",
      createdAt: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("appointments").insert(appointment);
      if (error) throw error;
      return appointment;
    }

    const existing = readLocal();
    writeLocal([appointment, ...existing]);
    return appointment;
  },

  async list(): Promise<Appointment[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .order("createdAt", { ascending: false });
      if (error) throw error;
      return (data as Appointment[]) ?? [];
    }
    return readLocal();
  },

  async updateStatus(id: string, status: AppointmentStatus): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("appointments").update({ status }).eq("id", id);
      if (error) throw error;
      return;
    }
    const existing = readLocal();
    writeLocal(existing.map((a) => (a.id === id ? { ...a, status } : a)));
  },
};
