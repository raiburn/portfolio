import { ImageResponse } from "next/og";
import { profile, siteUrl } from "@/data/site";
import { Chip, ogColors, ogSize, publicImage } from "@/lib/og";

export const alt = `${profile.name} · ${profile.role}`;
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  const photo = await publicImage(profile.photo);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          gap: 64,
          padding: "0 88px",
          background: ogColors.bg,
          borderTop: `8px solid ${ogColors.accent}`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontSize: 84, color: ogColors.heading, letterSpacing: -2 }}>{profile.name}</div>
          <div style={{ fontSize: 40, color: ogColors.heading, marginTop: 8 }}>{profile.role}</div>
          <div style={{ fontSize: 30, color: ogColors.text, marginTop: 28, lineHeight: 1.4 }}>{profile.tagline}</div>
          <div style={{ display: "flex", gap: 12, marginTop: 40 }}>
            {["React", "Next.js", "TypeScript", "AI products"].map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
          <div style={{ fontSize: 26, color: ogColors.accent, marginTop: 44 }}>{new URL(siteUrl).host}</div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo}
          alt=""
          width={300}
          height={300}
          style={{ borderRadius: 999, objectFit: "cover", border: `6px solid ${ogColors.chip}` }}
        />
      </div>
    ),
    size,
  );
}
