"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

type Stage = "off" | "in" | "wait" | "out";

function normPath(p: string) {
  const path = p.split("?")[0]?.replace(/\/$/, "") || "/";
  return path === "" ? "/" : path;
}

type BlogCutContextValue = {
  navigateWithCut: (href: string) => void;
};

const BlogCutContext = createContext<BlogCutContextValue | null>(null);

export function useBlogCutNavigate(): BlogCutContextValue {
  const ctx = useContext(BlogCutContext);
  if (!ctx) {
    throw new Error("useBlogCutNavigate must be used within BlogCutProvider");
  }
  return ctx;
}

export function BlogCutProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [stage, setStage] = useState<Stage>("off");
  const stageRef = useRef<Stage>("off");
  const targetRef = useRef<string | null>(null);
  const busyRef = useRef(false);

  const go = useCallback((s: Stage) => {
    stageRef.current = s;
    setStage(s);
  }, []);

  const finishOut = useCallback(() => {
    go("off");
    busyRef.current = false;
    targetRef.current = null;
  }, [go]);

  useEffect(() => {
    if (stage !== "wait" || !targetRef.current) return;
    if (normPath(pathname) === normPath(targetRef.current)) {
      go("out");
    }
  }, [pathname, stage, go]);

  const navigateWithCut = useCallback(
    (href: string) => {
      const pathOnly = href.split("?")[0] ?? href;
      if (normPath(pathname) === normPath(pathOnly)) return;

      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        router.push(href);
        return;
      }

      if (busyRef.current) return;
      busyRef.current = true;
      targetRef.current = href.startsWith("/") ? href : `/${href}`;
      go("in");
    },
    [router, pathname, go]
  );

  const onCoverComplete = useCallback(() => {
    if (stageRef.current !== "in") return;
    const t = targetRef.current;
    if (t) router.push(t);
    go("wait");
  }, [router, go]);

  const onRevealComplete = useCallback(() => {
    if (stageRef.current !== "out") return;
    finishOut();
  }, [finishOut]);

  const showOverlay = stage !== "off";

  return (
    <BlogCutContext.Provider value={{ navigateWithCut }}>
      {children}
      {showOverlay ? (
        <motion.div
          className="fixed inset-0 z-[200] pointer-events-auto bg-stone-50 shadow-[inset_4px_0_0_#dc2626]"
          initial={{ scaleX: 0, transformOrigin: "0% 50%" }}
          animate={
            stage === "in"
              ? { scaleX: 1, transformOrigin: "0% 50%" }
              : stage === "wait"
                ? { scaleX: 1, transformOrigin: "0% 50%" }
                : { scaleX: 0, transformOrigin: "100% 50%" }
          }
          transition={{
            duration: stage === "out" ? 0.42 : 0.38,
            ease: [0.16, 1, 0.3, 1],
          }}
          onAnimationComplete={() => {
            const s = stageRef.current;
            if (s === "in") onCoverComplete();
            else if (s === "out") onRevealComplete();
          }}
          aria-hidden
        />
      ) : null}
    </BlogCutContext.Provider>
  );
}

export function BlogCutLink({
  href,
  className,
  children,
  ...rest
}: Omit<React.ComponentPropsWithoutRef<"a">, "href"> & { href: string }) {
  const { navigateWithCut } = useBlogCutNavigate();

  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        if (e.button !== 0) return;
        e.preventDefault();
        navigateWithCut(href);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
