import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  entries: defineTable({
    text: v.string(),
    color: v.string(),
    image: v.optional(v.union(v.string(), v.null())),
    category: v.string(),
    date: v.string(),
    legacyId: v.optional(v.number()),
  }),
});
