import { parse } from "./translationReferenceMatcher.js";
import type { CustomApiInlangIdeExtension, Plugin } from "@inlang/plugin";

export const ideExtensionConfig = (): ReturnType<
  Exclude<Plugin["addCustomApi"], undefined>
> => ({
  "app.inlang.ideExtension": {
    messageReferenceMatchers: [
      async (args: { documentText: string }) => {
        return parse(args.documentText);
      },
    ],
    extractMessageOptions: [
      {
        callback: (args: { messageId: string }) => ({
          messageId: args.messageId,
          messageReplacement: `@i18n.T(ctx, "${args.messageId}")`,
        }),
      },
      {
        callback: (args: { messageId: string }) => ({
          messageId: args.messageId,
          messageReplacement: `{ i18n.Translation(ctx, "${args.messageId}") }`,
        }),
      },
      {
        callback: (args: { messageId: string }) => ({
          messageId: args.messageId,
          messageReplacement: `i18n.Translation(ctx, "${args.messageId}")`,
        }),
      },
      {
        callback: (args: { messageId: string }) => ({
          messageId: args.messageId,
          messageReplacement: args.messageId,
        }),
      },
    ],
    documentSelectors: [
      {
        language: "golang",
      },
      {
        language: "templ",
      },
    ],
  } satisfies CustomApiInlangIdeExtension,
});
