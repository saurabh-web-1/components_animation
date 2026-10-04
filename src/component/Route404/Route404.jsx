
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plug } from "lucide-react";

const PLUG_BODY = { width: 112, height: 74 };
const PLUG_TOTAL = { width: 130, height: 74 };
const SNAP_DISTANCE = 125;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const Route404 = () => {
  const stageRef = useRef(null);
  const timerRef = useRef(null);

  const [geometry, setGeometry] = useState(null);
  const [plug, setPlug] = useState({ x: 0, y: 0 });
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [inserting, setInserting] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [nearSocket, setNearSocket] = useState(false);
  const [flash, setFlash] = useState(false);
  const [grabOffset, setGrabOffset] = useState({
    x: PLUG_TOTAL.width / 2,
    y: PLUG_TOTAL.height / 2,
  });

  const updateGeometry = () => {
    if (!stageRef.current) return;

    const rect = stageRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const groundY = height - 23;

    // Single connection anchor for socket + plug + cable.
    const socket = {
      x: width - Math.max(92, width * 0.065),
      y: height * 0.53,
    };

    // Actual opening center.
    const socketOpeningWidth = 58;
    const socketOpeningLeft = socket.x - socketOpeningWidth / 2;

    // Plug body stops slightly inside the socket face.
    const connectedPlug = {
      x: socketOpeningLeft - PLUG_BODY.width + 8,
      y: socket.y - PLUG_BODY.height / 2,
    };

    // Small pre-insert position.
    const preInsertPlug = {
      x: connectedPlug.x - 22,
      y: connectedPlug.y,
    };

    // Initial unplugged position.
    const disconnectedPlug = {
      x: Math.max(70, width * 0.22),
      y: groundY - PLUG_BODY.height + 2,
    };

    const next = {
      width,
      height,
      groundY,
      socket,
      socketOpeningLeft,
      connectedPlug,
      preInsertPlug,
      disconnectedPlug,
    };

    setGeometry(next);

    setPlug((current) => {
      if (current.x === 0 && current.y === 0) {
        return next.disconnectedPlug;
      }
      return current;
    });
  };

  useEffect(() => {
    updateGeometry();
    window.addEventListener("resize", updateGeometry);

    return () => {
      window.removeEventListener("resize", updateGeometry);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const socketPoint = geometry?.socket;

  const plugCenter = {
    x: plug.x + PLUG_TOTAL.width / 2,
    y: plug.y + PLUG_TOTAL.height / 2,
  };

  const socketDistance = socketPoint
    ? Math.hypot(
        plugCenter.x - socketPoint.x,
        plugCenter.y - socketPoint.y
      )
    : Infinity;

  const cableStart = {
    x: 22,
    y: geometry?.groundY || 300,
  };

  const cableEnd = {
    x: plug.x + 2,
    y: plug.y + PLUG_BODY.height / 2,
  };

  const horizontalDistance = Math.max(
    80,
    cableEnd.x - cableStart.x
  );

  const bend = Math.min(
    280,
    Math.max(110, horizontalDistance * 0.34)
  );

  const cablePath = `
    M ${cableStart.x} ${cableStart.y}
    C ${cableStart.x + 165} ${cableStart.y},
      ${cableEnd.x - bend} ${cableEnd.y + 108},
      ${cableEnd.x} ${cableEnd.y}
  `;

  const connect = () => {
    if (!geometry || connected || connecting) return;

    setDragging(false);
    setNearSocket(false);
    setConnecting(true);
    setInserting(false);

    // First stop: plug comes close to the socket.
    setPlug(geometry.preInsertPlug);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      // Second phase: pins actually slide into the socket.
      setInserting(true);
      setPlug(geometry.connectedPlug);

      timerRef.current = setTimeout(() => {
        setConnected(true);
        setConnecting(false);
        setInserting(false);
        setFlash(true);

        timerRef.current = setTimeout(() => {
          setFlash(false);
        }, 320);
      }, 420);
    }, 430);
  };

  const disconnect = () => {
    if (!geometry || connecting) return;

    setConnected(false);
    setConnecting(false);
    setInserting(false);
    setDragging(false);
    setNearSocket(false);

    setPlug(geometry.disconnectedPlug);
  };

  const handlePointerDown = (event) => {
    if (!geometry || connecting) return;

    const rect = stageRef.current.getBoundingClientRect();

    const pointerX = event.clientX - rect.left;
    const pointerY = event.clientY - rect.top;

    setGrabOffset({
      x: pointerX - plug.x,
      y: pointerY - plug.y,
    });

    if (connected) {
      setConnected(false);
      setInserting(false);

      setPlug({
        x: geometry.connectedPlug.x - 68,
        y: geometry.connectedPlug.y,
      });
    }

    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!dragging || !stageRef.current || !geometry) return;

    const rect = stageRef.current.getBoundingClientRect();

    const pointerX = event.clientX - rect.left;
    const pointerY = event.clientY - rect.top;

    const x = clamp(
      pointerX - grabOffset.x,
      22,
      geometry.width - PLUG_TOTAL.width - 22
    );

    const y = clamp(
      pointerY - grabOffset.y,
      30,
      geometry.height - PLUG_TOTAL.height - 5
    );

    const centerX = x + PLUG_TOTAL.width / 2;
    const centerY = y + PLUG_TOTAL.height / 2;

    const distance = Math.hypot(
      centerX - geometry.socket.x,
      centerY - geometry.socket.y
    );

    setPlug({ x, y });
    setNearSocket(distance < SNAP_DISTANCE);
  };

  const handlePointerUp = () => {
    if (!dragging) return;

    setDragging(false);

    if (socketDistance < SNAP_DISTANCE) {
      connect();
    } else {
      setNearSocket(false);
    }
  };

  const plugRotation = connected
    ? 0
    : nearSocket
      ? -1
      : dragging
        ? -2
        : 0;

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#0b0912] text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(46,36,68,0.28),transparent_42%),radial-gradient(circle_at_85%_80%,rgba(37,29,54,0.2),transparent_35%)]" />

      <motion.div
        animate={{
          opacity: connected ? 1 : 0.6,
          scale: connected ? 1 : 0.98,
        }}
        transition={{ duration: 0.7 }}
        className="pointer-events-none absolute left-1/2 top-[23%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#181225]/55 blur-[150px]"
      />

      {/* Main content */}
      <section className="relative z-10 flex min-h-screen flex-col items-center px-5 pt-[6.5vh] text-center">
        <AnimatePresence mode="wait">
          {connected ? (
            <motion.div
              key="connected"
              initial={{ opacity: 0, y: -7 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 7 }}
              transition={{ duration: 0.3 }}
              className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/60"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
              Power restored
            </motion.div>
          ) : (
            <motion.div
              key="disconnected"
              initial={{ opacity: 0, y: -7 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 7 }}
              transition={{ duration: 0.3 }}
              className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/30"
            >
              <span className="h-1.5 w-1.5 rounded-full border border-white/20" />
              Signal lost
            </motion.div>
          )}
        </AnimatePresence>

        {/* 404 */}
        <motion.div
          animate={{
            opacity: connected ? 1 : 0.16,
            scale: connected ? 1 : 0.985,
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="select-none text-[120px] font-semibold leading-[0.8] tracking-[-0.1em] text-white md:text-[165px] lg:text-[185px]"
        >
          404
        </motion.div>

        {/* Heading */}
        <motion.h1
          animate={{ opacity: connected ? 1 : 0.42 }}
          transition={{ duration: 0.55 }}
          className="mt-8 text-[30px] font-semibold tracking-[-0.045em] md:text-[39px] lg:text-[45px]"
        >
          This page came unplugged.
        </motion.h1>

        {/* Description */}
        <motion.p
          animate={{ opacity: connected ? 0.5 : 0.25 }}
          transition={{ duration: 0.55 }}
          className="mt-4 max-w-[625px] text-[14px] leading-7 text-white md:text-[16px]"
        >
          We couldn't find the page you were looking for. It may have
          moved, or the link may be broken.
        </motion.p>

        {/* Home */}
        <motion.button
          type="button"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="mt-8 flex h-[58px] items-center gap-3 rounded-full bg-[#f1f0f3] px-8 text-[15px] font-semibold text-[#141218] shadow-[0_16px_35px_rgba(0,0,0,0.3)] transition hover:bg-white"
        >
          <ArrowLeft size={18} strokeWidth={2.2} />
          Take me home
        </motion.button>
      </section>

      {/* Interactive bottom stage */}
      <div
        ref={stageRef}
        className="absolute bottom-0 left-0 right-0 z-30 h-[34vh] min-h-[255px] overflow-hidden"
        style={{ touchAction: "none" }}
      >
        {/* Ground */}
        <div className="absolute bottom-[18px] left-[6vw] right-[2.8vw] h-[11px] rounded-[7px] border border-white/[0.06] bg-[#15131b] shadow-[0_7px_22px_rgba(0,0,0,0.5)]" />

        <div className="absolute bottom-[28px] left-[6vw] right-[2.8vw] h-px bg-white/[0.08]" />

        <div className="absolute bottom-[18px] left-[6vw] h-[72px] w-[10px] rounded-t-[8px] border border-white/[0.06] bg-[#131119]" />

        {/* Cable shadow */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          preserveAspectRatio="none"
        >
          <motion.path
            animate={{ d: cablePath }}
            transition={{
              duration: dragging ? 0.05 : 0.22,
              ease: "easeOut",
            }}
            fill="none"
            stroke="rgba(0,0,0,0.95)"
            strokeWidth="14"
            strokeLinecap="round"
          />
        </svg>

        {/* Cable */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          preserveAspectRatio="none"
        >
          <motion.path
            animate={{ d: cablePath }}
            transition={{
              duration: dragging ? 0.05 : 0.22,
              ease: "easeOut",
            }}
            fill="none"
            stroke="#24212b"
            strokeWidth="9"
            strokeLinecap="round"
          />

          <motion.path
            animate={{ d: cablePath }}
            transition={{
              duration: dragging ? 0.05 : 0.22,
              ease: "easeOut",
            }}
            fill="none"
            stroke="rgba(255,255,255,0.09)"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>

        {/* 3D Socket */}
        {socketPoint && (
          <div
            className="pointer-events-none absolute z-[65]"
            style={{
              left: socketPoint.x - 9,
              top: socketPoint.y - 100,
              width: 126,
              height: 205,
            }}
          >
            {/* Rear board */}
            <div className="absolute right-0 top-0 h-full w-[74px] rounded-[9px] border border-white/[0.065] bg-[#121018] shadow-[15px_20px_40px_rgba(0,0,0,0.6)]" />

            {/* Back edge */}
            <div className="absolute right-[-8px] top-[9px] h-[187px] w-[8px] rounded-r-[8px] bg-[#09080e]" />

            {/* Inner rear */}
            <div className="absolute right-[8px] top-[10px] h-[184px] w-[61px] rounded-[7px] border border-white/[0.035] bg-[#0e0c13]" />

            {/* Socket body */}
            <motion.div
              animate={{
                boxShadow: connected
                  ? "0 0 65px rgba(139,120,183,0.12)"
                  : "0 0 25px rgba(0,0,0,0.35)",
              }}
              transition={{ duration: 0.65 }}
              className="absolute left-0 top-[38px] h-[116px] w-[88px] rounded-[18px] border border-white/[0.085] bg-[#25212b] shadow-[0_20px_35px_rgba(0,0,0,0.5)]"
              style={{
                transform: "perspective(700px) rotateY(-17deg)",
                transformOrigin: "left center",
              }}
            >
              <div className="absolute inset-[5px] rounded-[13px] border border-white/[0.035] bg-gradient-to-r from-[#2c2832] to-[#1b1920]" />

            

              {/* Side depth */}
              <div className="absolute right-[5px] top-[13px] h-[90px] w-[8px] rounded-r-[6px] bg-[#0e0c12]" />
            </motion.div>

            {/* Top reflection */}
            <div className="absolute right-[18px] top-[19px] h-[3px] w-[3px] rounded-full bg-white/50 shadow-[0_0_8px_rgba(255,255,255,0.55)]" />
            <div className="absolute right-[17px] top-[61px] h-[38px] w-px bg-white/[0.07]" />
          </div>
        )}

        {/* Magnetic target */}
        <AnimatePresence>
          {nearSocket && !connected && socketPoint && (
            <motion.div
              initial={{ opacity: 0, scale: 0.72 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.72 }}
              transition={{ duration: 0.22 }}
              className="pointer-events-none absolute rounded-full border border-white/[0.08] bg-white/[0.012]"
              style={{
                left: socketPoint.x - 58,
                top: socketPoint.y - 58,
                width: 116,
                height: 116,
              }}
            />
          )}
        </AnimatePresence>

        {/* Plug */}
        <motion.div
          role="button"
          tabIndex={0}
          aria-label={
            connected
              ? "Drag plug to disconnect"
              : "Drag plug into socket"
          }
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          animate={{
            x: plug.x,
            y: plug.y,
            rotate: plugRotation,
            scale: dragging ? 1.025 : 1,
          }}
          transition={
            dragging
              ? { duration: 0.04 }
              : {
                  type: "spring",
                  stiffness: 420,
                  damping: 30,
                  mass: 0.7,
                }
          }
          className="absolute z-[55] h-[74px] w-[130px] cursor-grab select-none touch-none active:cursor-grabbing"
          style={{ transformOrigin: "82% 50%" }}
        >
          {/* Shadow */}
          <div className="absolute left-[5px] top-[14px] h-[55px] w-[112px] rounded-[19px] bg-black/75 blur-xl" />

          {/* Cable collar */}
          <div className="absolute -left-[8px] top-1/2 h-[45px] w-[15px] -translate-y-1/2 rounded-l-[6px] bg-[#111016] shadow-[inset_1px_0_rgba(255,255,255,0.045)]" />

          {/* Plug body */}
          <div className="absolute left-0 top-0 h-[74px] w-[112px] rounded-[18px] border border-white/[0.09] bg-[#29262f] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_38px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-[5px] rounded-[13px] border border-white/[0.025] bg-gradient-to-b from-[#34303a] to-[#211f26]" />

            <div className="absolute left-[13px] top-1/2 h-[36px] w-[36px] -translate-y-1/2 rounded-[10px] border border-white/[0.055] bg-[#151318]">
              <div className="absolute left-1/2 top-1/2 h-[11px] w-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0a090d]" />
            </div>

            <div className="absolute left-[59px] top-[18px] h-[2px] w-[31px] rounded-full bg-white/[0.085]" />
            <div className="absolute left-[59px] top-[30px] h-[2px] w-[22px] rounded-full bg-white/[0.045]" />

            <div className="absolute right-[9px] top-[12px] h-[50px] w-[7px] rounded-full bg-black/20" />
          </div>

          {/* Upper pin */}
          <motion.div
            animate={{
              x: connecting
                ? inserting
                  ? 14
                  : 2
                : connected
                  ? 16
                  : 0,
              opacity: connected ? 0.18 : 1,
            }}
            transition={{
              duration: inserting ? 0.36 : 0.18,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute right-[-17px] top-[15px] h-[14px] w-[28px] rounded-r-[7px] bg-gradient-to-r from-[#79777b] via-[#dedee0] to-[#737176] shadow-[0_0_7px_rgba(255,255,255,0.1)]"
          />

          {/* Lower pin */}
          <motion.div
            animate={{
              x: connecting
                ? inserting
                  ? 14
                  : 2
                : connected
                  ? 16
                  : 0,
              opacity: connected ? 0.18 : 1,
            }}
            transition={{
              duration: inserting ? 0.36 : 0.18,
              delay: 0.025,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute right-[-17px] bottom-[15px] h-[14px] w-[28px] rounded-r-[7px] bg-gradient-to-r from-[#79777b] via-[#dedee0] to-[#737176] shadow-[0_0_7px_rgba(255,255,255,0.1)]"
          />

          {/* Connector collar on plug */}
          <motion.div
            animate={{
              x: inserting ? 6 : 0,
            }}
            transition={{
              duration: 0.36,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute right-[0px] top-[10px] z-10 h-[54px] w-[8px] rounded-r-[7px] bg-[#1c1a20]"
          />
        </motion.div>

        {/* Connection flash */}
        <AnimatePresence>
          {flash && socketPoint && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute z-[100]"
              style={{
                left: socketPoint.x - 5,
                top: socketPoint.y - 5,
              }}
            >
              <motion.span
                initial={{ opacity: 1, scale: 0.2 }}
                animate={{ opacity: 0, scale: 3 }}
                transition={{ duration: 0.3 }}
                className="absolute h-[10px] w-[10px] rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.95)]"
              />

              {[0, 45, 90, 135].map((angle) => (
                <motion.span
                  key={angle}
                  initial={{ opacity: 0, scaleY: 0.2 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scaleY: 1,
                  }}
                  transition={{
                    duration: 0.27,
                    ease: "easeOut",
                  }}
                  style={{ rotate: angle }}
                  className="absolute left-1/2 top-1/2 h-[22px] w-px origin-bottom bg-white/80"
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom left action */}
      <motion.button
        type="button"
        onClick={connected ? disconnect : connect}
        disabled={connecting}
        whileHover={{ x: 3 }}
        whileTap={{ scale: 0.97 }}
        className="absolute bottom-[46px] left-[6.8vw] z-[110] flex h-[56px] items-center gap-3 rounded-full border border-white/[0.09] bg-white/[0.015] px-7 text-[15px] font-semibold text-white/65 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.035] hover:text-white disabled:cursor-wait"
      >
        {connecting ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/15 border-t-white/70" />
            Connecting
          </>
        ) : connected ? (
          <>
            <Plug size={17} strokeWidth={2} />
            Unplug it
          </>
        ) : (
          <>
            <Plug size={17} strokeWidth={2} />
            Plug it back in
          </>
        )}
      </motion.button>

      {/* Instruction */}
      <AnimatePresence>
        {!connected && !connecting && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-[111px] left-[6.9vw] z-[100] text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30"
          >
            Drag the plug into the socket
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-[16px] left-1/2 z-[100] -translate-x-1/2 text-[8px] uppercase tracking-[0.32em] text-white/[0.14]">
        Route 404
      </div>
    </main>
  );
};

export default Route404;