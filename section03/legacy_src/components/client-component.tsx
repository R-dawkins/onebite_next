"use client";

import { ReactNode } from "react";
import ServerComponent from "./server-component";

export default function ClientComponent({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
