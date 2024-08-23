export function parse(sourceCode: string): {
  messageId: string;
  position: {
    start: {
      line: number;
      character: number;
    };
    end: {
      line: number;
      character: number;
    };
  };
}[] {
  const functionCallRegex =
    /\bi18n\.(?:T|Translation)\s*\(\s*(?:ctx|r.Context\(\))\s*,\s*(['"])(.*?)\1\s*\)/g;

  const matches = [];
  let match;

  while ((match = functionCallRegex.exec(sourceCode)) !== null) {
    const messageId = match[2]!;
    const start = sourceCode.slice(0, match.index).split("\n");
    const end = sourceCode.slice(0, functionCallRegex.lastIndex).split("\n");

    matches.push({
      messageId: messageId,
      position: {
        start: {
          line: start.length,
          character: start[start.length - 1]!.length + 1,
        },
        end: {
          line: end.length,
          character: end[end.length - 1]!.length + 1,
        },
      },
    });
  }

  return matches;
}
