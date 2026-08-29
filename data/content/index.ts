import type { SubtopicContent } from '~/data/content-types';

const modules = import.meta.glob('~/data/content/*.ts');

export async function loadTopicContent(topicSlug: string): Promise<Record<string, SubtopicContent>> {
  const path = `/data/content/${topicSlug}.ts`;
  const mod = modules[path];
  if (!mod) return {};
  const imported = await mod() as any;
  return imported.content as Record<string, SubtopicContent>;
}

export function getSubtopicContent(
  contentMap: Record<string, SubtopicContent>,
  subSlug: string
): SubtopicContent | undefined {
  return contentMap[subSlug];
}