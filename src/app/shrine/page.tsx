import type { Metadata } from "next";
import { ShrineClient } from "./ShrineClient";

export const metadata: Metadata = {
  title: "秘密",
  robots: { index: false, follow: false },
};

export default function ShrinePage() {
  return <ShrineClient />;
}
