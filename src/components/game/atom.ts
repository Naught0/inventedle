import type { InventionSelect } from "@/db/schema";
import { atom } from "jotai";

export const inventionAtom = atom<InventionSelect>();
