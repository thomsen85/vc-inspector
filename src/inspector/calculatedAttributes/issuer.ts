import { z } from 'zod';
import { Result, toError, toOk } from './errors';
import { Standards } from './standards';
import { ParserResult, StandardParsers, standardParsersToParserResult, unimplementedParser } from './types';

export type Issuer = {
  id: string;
  attributes: Record<string, unknown>;
};

const issuerParsers: StandardParsers<Issuer> = [
  { standard: Standards.W3C_V1, parser: W3CIssueParser },
  { standard: Standards.W3C_V2, parser: W3CIssueParser },
  { standard: Standards.MDOC, parser: unimplementedParser },
];

export function parseIssuer(obj: unknown): ParserResult<Issuer> {
  return standardParsersToParserResult(issuerParsers, obj);
}

function W3CIssueParser(obj: unknown): Result<Issuer> {
  const schema = z.object({
    issuer: z.string().or(z.object({ id: z.string() })),
  });

  const parsed = schema.safeParse(obj);

  if (!parsed.success) {
    return toError(parsed.error);
  }

  const issuer = parsed.data.issuer;
  if (typeof issuer === 'string') {
    return toOk({ id: issuer, attributes: {} });
  } else {
    const { id, ...attributes } = issuer as { id: string };

    return toOk({ id, attributes });
  }
}