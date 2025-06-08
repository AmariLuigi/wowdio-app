"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import React, { useCallback, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

interface MagicCardProps {
  children?: React.ReactNode;
  className?: string;
}

export function MagicCard({
  children,
  className,
}: MagicCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white shadow-md border border-gray-100", // soft shadow, white bg, rounded
        className
      )}
    >
      <div className="relative">{children}</div>
    </div>
  );
}
