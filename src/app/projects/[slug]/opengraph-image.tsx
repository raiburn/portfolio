import { ImageResponse } from "next/og";
import { caseStudies, getCaseStudy } from "@/data/case-studies";
import { profile, siteUrl } from "@/data/site";
import { Chip, ogColors, ogSize, publicImage } from "@/lib/og";

export const alt = `Case study by ${profile.name}`;
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const study = getCaseStudy((await params).slug)!;
  const hero = await publicImage(study.hero.src);
  // The summary's first sentence keeps the text readable at preview size.
  const pitch = study.summary.split(/(?<=\.) /)[0];

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: ogColors.bg,
          borderTop: `8px solid ${ogColors.accent}`,
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: 680, padding: "64px 0 56px 80px" }}>
          <div style={{ fontSize: 22, letterSpacing: 4, color: ogColors.muted }}>CASE STUDY</div>
          <div style={{ fontSize: study.name.length > 14 ? 56 : 68, color: ogColors.heading, marginTop: 12, letterSpacing: -1.5 }}>
            {study.name}
          </div>
          <div style={{ fontSize: 26, color: ogColors.text, marginTop: 20, lineHeight: 1.4 }}>{pitch}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 32 }}>
            {study.stack.slice(0, 3).map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
          <div style={{ display: "flex", marginTop: "auto", fontSize: 26, color: ogColors.heading }}>
            {profile.name}
            <span style={{ color: ogColors.accent, marginLeft: 16 }}>{new URL(siteUrl).host}</span>
          </div>
        </div>
        {/* Screenshot bleeding off the right edge */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={hero}
          alt=""
          width={640}
          height={480}
          style={{
            position: "absolute",
            left: 720,
            top: 96,
            borderRadius: 16,
            objectFit: "cover",
            objectPosition: "top left",
            border: "1px solid #334155",
          }}
        />
      </div>
    ),
    size,
  );
}
