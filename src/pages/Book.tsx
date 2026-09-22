import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate, useLocation, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { Car, CheckCircle2, Truck, Bus, Caravan } from "lucide-react";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { WizardOptionCard } from "../components/ui/WizardOptionCard";
import { Calendar } from "../components/ui/Calendar";
import { appointmentService } from "../lib/appointments";
import { isValidEmail, isValidPhone } from "../lib/utils";
import { packages, addOns } from "../data/packages";
import { business } from "../data/business";
import type { AppointmentInput, PackageTier, VehicleType } from "../types";

const STEPS = [
  "Package",
  "Vehicle Type",
  "Vehicle",
  "Add-Ons",
  "Notes",
  "Date",
  "Time",
  "Contact",
] as const;

const TOTAL_STEPS = STEPS.length;
const CONTACT_STEP = TOTAL_STEPS - 1;

const vehicleTypeOptions: { id: VehicleType; label: string; icon: typeof Car }[] = [
  { id: "car", label: "Car", icon: Car },
  { id: "suv", label: "SUV", icon: Caravan },
  { id: "truck", label: "Truck", icon: Truck },
  { id: "van", label: "Van", icon: Bus },
];

const timeOptions = [
  { id: "morning", label: "Morning" },
  { id: "afternoon", label: "Afternoon" },
  { id: "evening", label: "Evening" },
] as const;

type FormState = {
  package: PackageTier | "not-sure" | "";
  vehicleType: VehicleType | "";
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  addOns: string[];
  notes: string;
  preferredDate: string;
  preferredTime: "morning" | "afternoon" | "evening" | "";
  name: string;
  phone: string;
  email: string;
  marketingOptIn: boolean;
};

const emptyForm: FormState = {
  package: "",
  vehicleType: "",
  vehicleYear: "",
  vehicleMake: "",
  vehicleModel: "",
  addOns: [],
  notes: "",
  preferredDate: "",
  preferredTime: "",
  name: "",
  phone: "",
  email: "",
  marketingOptIn: false,
};

export function Book() {
  const [searchParams] = useSearchParams();
  const initialPackage = searchParams.get("package");
  const navigate = useNavigate();
  const location = useLocation();

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduced = useReducedMotion();
  const [form, setForm] = useState<FormState>({
    ...emptyForm,
    package: (["silver", "gold", "diamond"].includes(initialPackage ?? "")
      ? (initialPackage as PackageTier)
      : "") as FormState["package"],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  // Mobile Safari/Chrome pin the page to keep a focused field above the
  // keyboard, but don't reliably re-scroll once the keyboard closes — the
  // page is left stuck at that offset. When the visual viewport grows back
  // (keyboard closing), nudge the scroll position to force it to resync.
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    let prevHeight = vv.height;
    function handleResize() {
      const grew = vv!.height > prevHeight;
      prevHeight = vv!.height;
      if (grew) window.scrollTo(window.scrollX, window.scrollY);
    }
    vv.addEventListener("resize", handleResize);
    return () => vv.removeEventListener("resize", handleResize);
  }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  }

  function toggleAddOn(id: string) {
    setForm((f) => ({
      ...f,
      addOns: f.addOns.includes(id) ? f.addOns.filter((a) => a !== id) : [...f.addOns, id],
    }));
  }

  function validateStep(current: number): boolean {
    const next: Record<string, string> = {};

    if (current === 5 && !form.preferredDate) next.preferredDate = "Please select a preferred date.";
    if (current === 5 && form.preferredDate && form.preferredDate < today) {
      next.preferredDate = "Please choose a date today or later.";
    }
    if (current === 6 && !form.preferredTime) next.preferredTime = "Please select a preferred time.";
    if (current === CONTACT_STEP) {
      if (!form.name.trim()) next.name = "Name is required.";
      if (!form.phone.trim() || !isValidPhone(form.phone)) next.phone = "Enter a valid phone number.";
      if (!form.email.trim() || !isValidEmail(form.email)) next.email = "Enter a valid email address.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function goNext() {
    if (!validateStep(step)) return;
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }

  function goBack() {
    if (step === 0) {
      // Nothing to step back to within the wizard — leave the page. If we
      // arrived via an in-app link there's real history to pop; if someone
      // opened /book directly (a fresh tab, a bookmark), `location.key` is
      // "default" and there's no in-app entry behind it, so send them
      // somewhere real instead of off the site or onto a blank history slot.
      if (location.key === "default") navigate("/");
      else navigate(-1);
      return;
    }
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit() {
    if (!validateStep(CONTACT_STEP)) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const input: AppointmentInput = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        vehicleYear: form.vehicleYear.trim(),
        vehicleMake: form.vehicleMake.trim(),
        vehicleModel: form.vehicleModel.trim(),
        vehicleType: form.vehicleType,
        package: form.package,
        addOns: form.addOns,
        preferredDate: form.preferredDate,
        preferredTime: form.preferredTime,
        notes: form.notes.trim(),
        marketingOptIn: form.marketingOptIn,
      };
      await appointmentService.create(input);
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong sending your request. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  // A real <form> (see below) means pressing Enter in any field naturally
  // advances the wizard or submits, the same way it would in a normal
  // single-page form — no keyboard user has to reach for the mouse.
  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step < TOTAL_STEPS - 1) goNext();
    else void handleSubmit();
  }

  if (submitted) {
    return (
      <section className="flex min-h-dvh items-center justify-center bg-bg px-5 pt-24">
        <Container className="max-w-lg text-center">
          <CheckCircle2 className="mx-auto h-14 w-14 text-blue-bright" aria-hidden="true" />
          <h1 className="mt-6 font-heading text-4xl font-semibold tracking-wide">REQUEST RECEIVED</h1>
          <p className="mt-4 text-muted">
            Thanks for reaching out. D's Spotless will contact you to confirm your appointment details.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button as="a" href={`tel:${business.phoneHref}`} variant="secondary">
              Call D's Spotless
            </Button>
            <Button as="link" to="/" variant="outline">
              Back to Home
            </Button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="min-h-dvh bg-bg pb-44 pt-28 sm:pb-32">
      <Container className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-a11y">Request Appointment</p>
        <h1 className="mt-2 font-heading text-4xl font-semibold tracking-wide">Book Your Detail</h1>

        <div className="mt-8">
          <div className="flex items-center justify-between text-xs text-muted">
            <span>
              Step {step + 1} of {TOTAL_STEPS}
            </span>
            <span>{STEPS[step]}</span>
          </div>
          <div
            className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10"
            role="progressbar"
            aria-valuenow={step + 1}
            aria-valuemin={1}
            aria-valuemax={TOTAL_STEPS}
            aria-label="Booking progress"
          >
            <motion.div
              className="h-full bg-blue-bright"
              animate={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>

        <form onSubmit={handleFormSubmit} noValidate>
          <div className="relative mt-10 min-h-[340px] overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                initial={{ opacity: 0, x: reduced ? 0 : direction * 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reduced ? 0 : direction * -24 }}
                transition={{ duration: reduced ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {step === 0 && (
                  <StepWrap title="What are you looking for?">
                    <div className="grid grid-cols-2 gap-3">
                      {packages.map((p) => (
                        <WizardOptionCard
                          key={p.id}
                          label={p.name}
                          description={p.tagline}
                          selected={form.package === p.id}
                          onClick={() => update("package", p.id)}
                        />
                      ))}
                      <WizardOptionCard
                        label="Not Sure"
                        description="We'll help you decide"
                        selected={form.package === "not-sure"}
                        onClick={() => update("package", "not-sure")}
                      />
                    </div>
                  </StepWrap>
                )}

                {step === 1 && (
                  <StepWrap title="What do you drive?">
                    <div className="grid grid-cols-2 gap-3">
                      {vehicleTypeOptions.map((v) => (
                        <WizardOptionCard
                          key={v.id}
                          label={v.label}
                          icon={<v.icon className="h-6 w-6" aria-hidden="true" />}
                          selected={form.vehicleType === v.id}
                          onClick={() => update("vehicleType", v.id)}
                        />
                      ))}
                    </div>
                  </StepWrap>
                )}

                {step === 2 && (
                  <StepWrap title="Tell us about your vehicle">
                    <div className="grid gap-4 sm:grid-cols-3">
                      <Field id="vehicleYear" label="Year">
                        <input
                          id="vehicleYear"
                          value={form.vehicleYear}
                          onChange={(e) => update("vehicleYear", e.target.value)}
                          inputMode="numeric"
                          placeholder="2022"
                          autoComplete="off"
                          className={inputClass}
                        />
                      </Field>
                      <Field id="vehicleMake" label="Make">
                        <input
                          id="vehicleMake"
                          value={form.vehicleMake}
                          onChange={(e) => update("vehicleMake", e.target.value)}
                          placeholder="Toyota"
                          autoComplete="off"
                          className={inputClass}
                        />
                      </Field>
                      <Field id="vehicleModel" label="Model">
                        <input
                          id="vehicleModel"
                          value={form.vehicleModel}
                          onChange={(e) => update("vehicleModel", e.target.value)}
                          placeholder="Highlander"
                          autoComplete="off"
                          className={inputClass}
                        />
                      </Field>
                    </div>
                  </StepWrap>
                )}

                {step === 3 && (
                  <StepWrap title="Additional services">
                    <div className="grid grid-cols-2 gap-3">
                      {addOns.map((a) => (
                        <WizardOptionCard
                          key={a.id}
                          label={a.label}
                          selected={form.addOns.includes(a.id)}
                          onClick={() => toggleAddOn(a.id)}
                        />
                      ))}
                    </div>
                    <p className="mt-4 text-xs text-muted">
                      Additional services may be available depending on vehicle condition and requirements.
                    </p>
                  </StepWrap>
                )}

                {step === 4 && (
                  <StepWrap title="What does your vehicle need?">
                    <label htmlFor="notes" className="sr-only">
                      Notes about your vehicle
                    </label>
                    <textarea
                      id="notes"
                      value={form.notes}
                      onChange={(e) => update("notes", e.target.value)}
                      rows={6}
                      placeholder="e.g. pet hair, salt, stains, heavy dirt, family vehicle, work vehicle..."
                      className={inputClass}
                    />
                  </StepWrap>
                )}

                {step === 5 && (
                  <StepWrap title="Preferred date" error={errors.preferredDate} errorId="preferredDate-error">
                    <Calendar value={form.preferredDate} min={today} onChange={(v) => update("preferredDate", v)} />
                  </StepWrap>
                )}

                {step === 6 && (
                  <StepWrap title="Preferred time" error={errors.preferredTime} errorId="preferredTime-error">
                    {/* Three across leaves ~66px of content per card on a phone,
                        which "Afternoon" overflows. Stacked below sm. */}
                    <div className="grid gap-3 sm:grid-cols-3" role="group" aria-label="Preferred time">
                      {timeOptions.map((t) => (
                        <WizardOptionCard
                          key={t.id}
                          label={t.label}
                          selected={form.preferredTime === t.id}
                          onClick={() => update("preferredTime", t.id)}
                        />
                      ))}
                    </div>
                  </StepWrap>
                )}

                {step === CONTACT_STEP && (
                  <StepWrap title="Your contact info">
                    <div className="grid gap-4">
                      <Field id="name" label="Name" error={errors.name}>
                        <input
                          id="name"
                          autoComplete="name"
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={errors.name ? "name-error" : undefined}
                          className={inputClass}
                        />
                      </Field>
                      <Field id="phone" label="Phone" error={errors.phone}>
                        <input
                          id="phone"
                          type="tel"
                          autoComplete="tel"
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          aria-invalid={Boolean(errors.phone)}
                          aria-describedby={errors.phone ? "phone-error" : undefined}
                          className={inputClass}
                        />
                      </Field>
                      <Field id="email" label="Email" error={errors.email}>
                        <input
                          id="email"
                          type="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={errors.email ? "email-error" : undefined}
                          className={inputClass}
                        />
                      </Field>
                    </div>

                    {/* Marketing is opt-in and unchecked by default — Canada's
                        anti-spam law (CASL) requires its own express consent
                        for promotional messages, separate from (and not a
                        condition of) booking the appointment itself. */}
                    <div className="mt-6 border-t border-white/10 pt-6">
                      <label className="flex items-start gap-3 text-sm text-white/60">
                        <input
                          type="checkbox"
                          checked={form.marketingOptIn}
                          onChange={(e) => update("marketingOptIn", e.target.checked)}
                          className="mt-0.5 h-5 w-5 flex-shrink-0 rounded border-white/25 bg-surface text-blue-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-bright"
                        />
                        <span>
                          Send me occasional offers and appointment reminders by email or text.{" "}
                          <span className="text-white/40">Optional — you can unsubscribe anytime.</span>
                        </span>
                      </label>
                    </div>

                    {submitError && (
                      <p role="alert" className="mt-3 text-sm text-red-400">
                        {submitError}
                      </p>
                    )}

                    {/* Notice, not a gate — no checkbox required to book. */}
                    <p className="mt-6 text-xs text-muted">
                      By requesting an appointment, you agree to our{" "}
                      <Link to="/privacy-policy" className="text-blue-a11y underline">
                        Privacy Policy
                      </Link>{" "}
                      and{" "}
                      <Link to="/terms" className="text-blue-a11y underline">
                        Terms &amp; Conditions
                      </Link>
                      .
                    </p>
                  </StepWrap>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between border-t border-white/10 bg-bg/95 px-5 py-4 backdrop-blur [padding-bottom:max(1rem,env(safe-area-inset-bottom))] sm:static sm:z-auto sm:mt-10 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:[padding-bottom:0] sm:backdrop-blur-none">
            <Button type="button" variant="ghost" onClick={goBack}>
              Back
            </Button>
            {step < TOTAL_STEPS - 1 ? (
              <Button type="submit">Continue</Button>
            ) : (
              <Button type="submit" disabled={submitting}>
                {submitting ? "Sending..." : "Request Appointment"}
              </Button>
            )}
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-muted sm:text-xs">
          Prefer to talk instead?{" "}
          <a href={`tel:${business.phoneHref}`} className="inline-block py-1 text-blue-a11y hover:underline">
            Call {business.phone}
          </a>
        </p>
      </Container>
    </section>
  );
}

// 16px on phones is deliberate: iOS Safari zooms the whole page in when a
// focused field is smaller than that, and never zooms back out. Back to 14px
// from sm upwards.
const inputClass =
  "w-full rounded-lg border border-white/15 bg-surface px-4 py-3 text-base text-white placeholder:text-white/30 outline-none transition-colors focus:border-blue-bright sm:text-sm";

function StepWrap({
  title,
  error,
  errorId,
  children,
}: {
  title: string;
  error?: string;
  errorId?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="mb-5 font-heading text-xl font-semibold tracking-wide sm:text-2xl">{title}</h2>
      {children}
      {error && (
        <p id={errorId} role="alert" className="mt-3 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted">
        {label}
      </label>
      {children}
      {error && (
        <span id={`${id}-error`} role="alert" className="mt-1.5 block text-xs text-red-400">
          {error}
        </span>
      )}
    </div>
  );
}
