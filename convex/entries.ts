import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("entries").collect();
  },
});

export const create = mutation({
  args: {
    text: v.string(),
    color: v.string(),
    image: v.optional(v.union(v.string(), v.null())),
    category: v.string(),
    date: v.string(),
    legacyId: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("entries", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("entries"),
    text: v.string(),
    color: v.string(),
    image: v.optional(v.union(v.string(), v.null())),
    category: v.string(),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

export const remove = mutation({
  args: { id: v.id("entries") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const importEntries = mutation({
  args: {
    entries: v.array(
      v.object({
        text: v.string(),
        color: v.string(),
        image: v.optional(v.union(v.string(), v.null())),
        category: v.string(),
        date: v.string(),
        legacyId: v.optional(v.number()),
      })
    ),
  },
  handler: async (ctx, args) => {
    let count = 0;
    for (const entry of args.entries) {
      await ctx.db.insert("entries", entry);
      count++;
    }
    return count;
  },
});
