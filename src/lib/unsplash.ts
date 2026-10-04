// Builds images.unsplash.com URLs (imgix) for sample imagery.
// Detail crops zoom into a focal point of the same photo, standing in for
// extra product shots until real gallery images exist.

export const crops = {
  center: { x: 0.5, y: 0.5, z: 2 },
  upper: { x: 0.5, y: 0.35, z: 1.5 },
  lowerLeft: { x: 0.4, y: 0.6, z: 1.6 },
} as const;

export type CropName = keyof typeof crops;

export function unsplash(photoId: string, crop?: CropName) {
  const base = `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=2400&q=80`;
  if (!crop) return base;
  const { x, y, z } = crops[crop];
  return `${base}&crop=focalpoint&fp-x=${x}&fp-y=${y}&fp-z=${z}`;
}
