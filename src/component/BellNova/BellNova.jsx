import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const notifications = [
  {
    id: 1,
    icon: "⚡",
    title: "New component added",
    text: "Animated search component is now live.",
    time: "2 min ago",
  },
  {
    id: 2,
    icon: "✨",
    title: "New animation",
    text: "A fresh micro interaction has been published.",
    time: "15 min ago",
  },
  {
    id: 3,
    icon: "✓",
    title: "Deployment successful",
    text: "Your latest component is live.",
    time: "1 hour ago",
  },
];

export default function BellNova() {
  const [open, setOpen] = useState(false);
  const [read, setRead] = useState([]);

  const unreadCount = notifications.length - read.length;

  const markAsRead = (id) => {
    setRead((prev) =>
      prev.includes(id) ? prev : [...prev, id]
    );
  };

  const markAllRead = () => {
    setRead(notifications.map((item) => item.id));
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#050505]">

      {/* Bell */}
      <motion.button
        onClick={() => setOpen((prev) => !prev)}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.92 }}
        className="relative flex h-[70px] w-[70px] items-center justify-center rounded-[22px] border border-white/10 bg-white/[0.05] backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.4)] top-[calc(50%+52px)]"
      >

        {/* Bell SVG */}
        <motion.svg
          key={open}
          viewBox="0 0 24 24"
          fill="none"
          className="h-7 w-7"
          animate={
            open
              ? {
                  rotate: [0, 16, -14, 11, -8, 5, -3, 0],
                }
              : { rotate: 0 }
          }
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          <path
            d="M18 8C18 4.686 15.314 2 12 2C8.686 2 6 4.686 6 8C6 13 4 15 3 17H21C20 15 18 13 18 8Z"
            stroke="white"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M9.5 20C10.05 21.2 10.9 22 12 22C13.1 22 13.95 21.2 14.5 20"
            stroke="white"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </motion.svg>


        {/* Notification Count */}
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              key={unreadCount}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 20,
              }}
              className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-[#050505] bg-red-500 px-1 text-[10px] font-bold text-white shadow-[0_0_15px_rgba(239,68,68,0.6)]"
            >
              {unreadCount}
            </motion.span>
          )}
        </AnimatePresence>


        {/* Notification pulse */}
        {unreadCount > 0 && (
          <motion.span
            className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-red-500"
            animate={{
              scale: [1, 1.7, 1],
              opacity: [0.35, 0, 0.35],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        )}


        {/* Sound waves */}
        <AnimatePresence>
          {open && (
            <>
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="pointer-events-none absolute rounded-full border border-white/40"
                  initial={{
                    width: 30,
                    height: 30,
                    opacity: 0.6,
                  }}
                  animate={{
                    width: 100,
                    height: 100,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.9,
                    delay: i * 0.12,
                    ease: "easeOut",
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

      </motion.button>


      {/* Notification Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: -15,
              scale: 0.94,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -10,
              scale: 0.95,
            }}
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 28,
            }}
            className="absolute left-1/2 top-[calc(50%+52px)] w-[360px] -translate-x-1/2 rounded-[22px] border border-white/10 bg-[#0d0d0d]/95 p-[18px] shadow-[0_30px_80px_rgba(0,0,0,0.7)] backdrop-blur-2xl"
          >

            {/* Header */}
            <div className="mb-3 flex items-start justify-between">

              <div>
                <h3 className="text-[17px] font-semibold text-white">
                  Notifications
                </h3>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={unreadCount}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-xs text-neutral-500"
                  >
                    {unreadCount > 0
                      ? `${unreadCount} unread notification${
                          unreadCount > 1 ? "s" : ""
                        }`
                      : "You're all caught up"}
                  </motion.p>
                </AnimatePresence>
              </div>


              <button
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05] text-xl text-neutral-500 transition hover:bg-white/[0.1] hover:text-white"
              >
                ×
              </button>

            </div>


            {/* Notifications */}
            <div className="space-y-2">

              {notifications.map((item) => {
                const isRead = read.includes(item.id);

                return (
                  <motion.div
                    key={item.id}
                    layout
                    onClick={() => markAsRead(item.id)}
                    whileHover={{ x: 3 }}
                    className={`relative flex cursor-pointer gap-3 rounded-[15px] border p-3 transition ${
                      isRead
                        ? "border-transparent bg-white/[0.02] opacity-50"
                        : "border-white/[0.04] bg-white/[0.04]"
                    }`}
                  >

                    {/* Icon */}
                    <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-sm">
                      {item.icon}
                    </div>


                    {/* Content */}
                    <div className="pr-3">

                      <div className="text-[13px] font-semibold text-white">
                        {item.title}
                      </div>

                      <p className="mt-1 text-[11px] leading-5 text-neutral-500">
                        {item.text}
                      </p>

                      <span className="text-[10px] text-neutral-600">
                        {item.time}
                      </span>

                    </div>


                    {/* Unread dot */}
                    <AnimatePresence>
                      {!isRead && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="absolute right-3 top-[17px] h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                        />
                      )}
                    </AnimatePresence>

                  </motion.div>
                );
              })}

            </div>


            {/* Mark all read */}
            {unreadCount > 0 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={markAllRead}
                className="mt-3 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] py-2.5 text-xs text-neutral-400 transition hover:bg-white/[0.08] hover:text-white"
              >
                Mark all as read
              </motion.button>
            )}

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}