"use client";

import { useSearchParams } from "next/navigation";

export function useQueryParams() {
  const query = useSearchParams().get("query");
  return { query }
}
