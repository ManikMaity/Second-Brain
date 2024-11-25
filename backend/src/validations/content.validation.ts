import { z } from "zod";

export const createContentSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(3, "Title must be at least 3 characters long")
    .max(50, "Title must be at most 50 characters long"),

  type : z.enum(["doc", "tweet", "link", "video"]),
  link: z
    .string({
      required_error: "link is required.",
      invalid_type_error: "link must be a string",
    })
    .url("Link must be a valid url")
    .min(1, "Link should no be empty"),

  tags: z
    .array(z.string().min(3, "Tag must be at least 3 characters long"))
    .optional(),
});


export const linkShareSchema = z.object({
  share : z.boolean({
    required_error : "Share is required",
    invalid_type_error : "Share must be a boolean"
  })
})


export type CreateContentType = z.infer<typeof createContentSchema>;