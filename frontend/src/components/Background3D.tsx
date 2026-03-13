/**
 * Subtle 3D Background Effects
 * Provides depth and visual interest without distracting from main content
 */
export default function Background3D() {
  return (
    <>
      {/* 3D Floating Orbs */}
      <div className="orb-3d orb-3d-1" />
      <div className="orb-3d orb-3d-2" />
      <div className="orb-3d orb-3d-3" />

      {/* Depth Layers */}
      <div className="depth-layer depth-layer-1" />
      <div className="depth-layer depth-layer-2" />

      {/* 3D Grid Perspective */}
      <div className="grid-perspective" />

      {/* Glow Rings */}
      <div className="glow-ring glow-ring-1" />
      <div className="glow-ring glow-ring-2" />
    </>
  );
}
