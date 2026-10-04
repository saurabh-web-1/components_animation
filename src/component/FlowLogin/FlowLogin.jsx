import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, ChevronDown, Check, Apple } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

const GoogleIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M21.35 12.23c0-.72-.06-1.42-.18-2.09H12v3.96h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.26Z" />
    <path fill="#34A853" d="M12 21.75c2.63 0 4.84-.87 6.46-2.36l-3.14-2.45c-.87.58-1.98.93-3.32.93-2.55 0-4.7-1.72-5.47-4.03H3.28v2.53A9.75 9.75 0 0 0 12 21.75Z" />
    <path fill="#FBBC05" d="M6.53 13.84A5.86 5.86 0 0 1 6.22 12c0-.64.11-1.26.31-1.84V7.63H3.28A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.06 1.03 4.37l3.25-2.53Z" />
    <path fill="#EA4335" d="M12 6.13c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.2 14.62 2.25 12 2.25a9.75 9.75 0 0 0-8.72 5.38l3.25 2.53C7.3 7.85 9.45 6.13 12 6.13Z" />
  </svg>
);

const FlowLogin = ({
  title = "Flow",
  subtitle = "Good to see you. Dive back in.",
  trigger = "click",
  showSocial = true,
  showRemember = true,
  showForgot = true,
  compactText = "Log in",
  primaryText = "Sign in",
  onSubmit,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const toggle = () => {
    if (!loading) setExpanded((value) => !value);
  };

  const handleCardClick = () => {
    if (trigger === "click" && !expanded) toggle();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      if (onSubmit) {
        await onSubmit({ email, password, remember });
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1400));
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const fieldVariant = {
    hidden: { opacity: 0, y: 12, filter: "blur(5px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.42, ease },
    },
  };

  const fadeVariant = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease },
    },
  };

  return (
    <div
      className="relative flex w-full items-center justify-center px-4 py-12 font-sans"
      onMouseEnter={() => trigger === "hover" && !loading && setExpanded(true)}
      onMouseLeave={() => trigger === "hover" && !loading && setExpanded(false)}
    >
      <motion.div
        animate={{
          opacity: expanded ? 0.95 : 0.7,
          scale: expanded ? 1.06 : 1,
        }}
        transition={{ duration: 0.8, ease }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.065] blur-[110px]"
      />

      <div className="relative flex w-full max-w-[410px] flex-col items-center">
        {/* Floating Orb */}
        <motion.div
          animate={{
            y: expanded ? -18 : 0,
            scale: expanded ? 1.03 : 1,
          }}
          transition={{ duration: 0.75, ease }}
          className="absolute -top-[50px] z-30"
        >
          <div className="relative h-[46px] w-[46px]">
            <div className="absolute inset-[2px] rounded-full bg-[radial-gradient(circle_at_30%_24%,#effcff_0%,#66e7ff_12%,#17bdf4_42%,#0875da_70%,#06357f_100%)] shadow-[0_0_20px_rgba(23,191,255,0.44),0_0_50px_rgba(23,191,255,0.16)]" />
            <div className="absolute left-[10px] top-[7px] h-[9px] w-[13px] rotate-[-20deg] rounded-full bg-white/75 blur-[2px]" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-[3px] rounded-full border border-white/[0.12]"
            />
            <span className="absolute right-[4px] top-[8px] h-[5px] w-[5px] rounded-full bg-white/70 blur-[1px]" />
          </div>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={false}
          animate={{
            height: expanded ? 575 : 198,
            borderRadius: expanded ? 27 : 22,
          }}
          transition={{ duration: 0.72, ease }}
          className="relative w-full overflow-hidden border border-cyan-200/[0.14] bg-[linear-gradient(180deg,rgba(22,43,56,0.97)_0%,rgba(11,27,37,0.98)_43%,rgba(7,12,22,0.99)_100%)] shadow-[0_28px_90px_rgba(0,0,0,0.6),0_0_60px_rgba(0,183,255,0.065)] backdrop-blur-2xl"
        >
          {/* Atmospheric glow */}
          <motion.div
            animate={{
              opacity: expanded ? 1 : 0.7,
              height: expanded ? 175 : 115,
            }}
            transition={{ duration: 0.7, ease }}
            className="pointer-events-none absolute inset-x-0 top-0 bg-[radial-gradient(ellipse_at_center_top,rgba(71,211,255,0.2),transparent_67%)] blur-[9px]"
          />

          <div className="relative z-10 px-7 pt-9">
            {/* Header */}
            <motion.div
              animate={{ y: expanded ? 0 : 1 }}
              transition={{ duration: 0.5, ease }}
              className="text-center"
            >
              <h2 className="text-[32px] font-semibold tracking-[-0.045em] text-cyan-200 drop-shadow-[0_0_17px_rgba(50,210,255,0.14)]">
                {title}
              </h2>

              <p className="mt-1.5 text-[12px] font-medium tracking-[-0.005em] text-white/45">
                {subtitle}
              </p>
            </motion.div>

            {/* Compact Button */}
            <motion.button
              type="button"
              onClick={handleCardClick}
              animate={{
                opacity: expanded ? 0 : 1,
                y: expanded ? 12 : 0,
              }}
              transition={{ duration: 0.28, ease }}
              className="absolute left-1/2 top-[121px] flex h-[38px] -translate-x-1/2 items-center gap-1.5 rounded-full border border-cyan-300/[0.2] bg-[#07354a]/75 px-5 text-[12px] font-semibold text-cyan-50 shadow-[0_0_20px_rgba(0,177,255,0.12)] transition hover:bg-[#0a4057]"
              style={{ pointerEvents: expanded ? "none" : "auto" }}
            >
              {compactText}
              <ChevronDown size={13} strokeWidth={2} />
            </motion.button>

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              animate={{
                opacity: expanded ? 1 : 0,
                y: expanded ? 0 : 14,
              }}
              transition={{
                duration: 0.42,
                delay: expanded ? 0.2 : 0,
                ease,
              }}
              className="mt-8 space-y-3.5"
              style={{ pointerEvents: expanded ? "auto" : "none" }}
            >
              {/* Email */}
              <motion.div variants={fieldVariant} initial="hidden" animate={expanded ? "show" : "hidden"}>
                <label className="mb-1.5 block text-[11px] font-semibold text-white/42">
                  Email address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  disabled={loading}
                  className="h-[45px] w-full rounded-[11px] border border-white/[0.07] bg-white/[0.025] px-3.5 text-[13px] font-medium text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300/[0.28] focus:bg-white/[0.04] disabled:opacity-60"
                />
              </motion.div>

              {/* Password */}
              <motion.div
                variants={fieldVariant}
                initial="hidden"
                animate={expanded ? "show" : "hidden"}
                transition={{ delay: 0.06 }}
              >
                <label className="mb-1.5 block text-[11px] font-semibold text-white/42">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    disabled={loading}
                    className="h-[45px] w-full rounded-[11px] border border-white/[0.07] bg-white/[0.025] px-3.5 pr-10 text-[13px] font-medium text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300/[0.28] focus:bg-white/[0.04] disabled:opacity-60"
                  />

                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => setPasswordVisible((value) => !value)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 transition hover:text-white/60 disabled:opacity-40"
                  >
                    {passwordVisible ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </motion.div>

              {/* Remember / Forgot */}
              {(showRemember || showForgot) && (
                <motion.div
                  variants={fieldVariant}
                  initial="hidden"
                  animate={expanded ? "show" : "hidden"}
                  transition={{ delay: 0.12 }}
                  className="flex items-center justify-between px-0.5"
                >
                  {showRemember ? (
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => setRemember((value) => !value)}
                      className="flex items-center gap-2 text-[10px] font-medium text-white/40 transition hover:text-white/60 disabled:opacity-40"
                    >
                      <span
                        className={`flex h-[14px] w-[14px] items-center justify-center rounded-[4px] border ${
                          remember
                            ? "border-cyan-300/50 bg-cyan-300/20"
                            : "border-white/[0.12] bg-white/[0.02]"
                        }`}
                      >
                        {remember && <Check size={9} strokeWidth={2.5} className="text-cyan-100" />}
                      </span>
                      Remember me
                    </button>
                  ) : (
                    <span />
                  )}

                  {showForgot && (
                    <button
                      type="button"
                      disabled={loading}
                      className="text-[10px] font-medium text-white/40 transition hover:text-white/65 disabled:opacity-40"
                    >
                      Forgot password?
                    </button>
                  )}
                </motion.div>
              )}

              {/* Sign in */}
              <motion.button
                variants={fadeVariant}
                initial="hidden"
                animate={expanded ? "show" : "hidden"}
                transition={{ delay: 0.17 }}
                type="submit"
                disabled={loading}
                className="flex h-[45px] w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(90deg,#08baf2,#0b7ef4)] text-[13px] font-semibold text-white shadow-[0_11px_25px_rgba(0,159,255,0.2)] transition duration-300 hover:brightness-110 disabled:cursor-wait disabled:opacity-80"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-[2px] border-white/25 border-t-white" />
                    Signing in...
                  </>
                ) : (
                  primaryText
                )}
              </motion.button>

              {/* Divider */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={expanded ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: 0.4, delay: 0.23, ease }}
                className="flex items-center gap-2"
              >
                <span className="h-px flex-1 bg-white/[0.06]" />
                <span className="text-[10px] font-medium text-white/22">
                  or continue with
                </span>
                <span className="h-px flex-1 bg-white/[0.06]" />
              </motion.div>

              {/* Social */}
              {showSocial && (
                <motion.div
                  initial="hidden"
                  animate={expanded ? "show" : "hidden"}
                  className="grid grid-cols-2 gap-2.5"
                >
                  <motion.button
                    variants={fadeVariant}
                    transition={{ delay: 0.27 }}
                    type="button"
                    disabled={loading}
                    className="flex h-[38px] items-center justify-center gap-2 rounded-[10px] border border-white/[0.07] bg-white/[0.025] text-[11px] font-medium text-white/65 transition hover:bg-white/[0.05] hover:text-white disabled:opacity-40"
                  >
                    <GoogleIcon size={15} />
                    Google
                  </motion.button>

                  <motion.button
                    variants={fadeVariant}
                    transition={{ delay: 0.31 }}
                    type="button"
                    disabled={loading}
                    className="flex h-[38px] items-center justify-center gap-2 rounded-[10px] border border-white/[0.07] bg-white/[0.025] text-[11px] font-medium text-white/65 transition hover:bg-white/[0.05] hover:text-white disabled:opacity-40"
                  >
                    <Apple size={15} strokeWidth={2} />
                    Apple
                  </motion.button>
                </motion.div>
              )}

              {/* Footer */}
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={expanded ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                transition={{ duration: 0.35, delay: 0.35, ease }}
                className="pt-1 text-center text-[10px] font-medium text-white/25"
              >
                New here?{" "}
                <button
                  type="button"
                  disabled={loading}
                  className="font-semibold text-cyan-300/70 transition hover:text-cyan-200 disabled:opacity-40"
                >
                  Create account
                </button>
              </motion.p>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FlowLogin;