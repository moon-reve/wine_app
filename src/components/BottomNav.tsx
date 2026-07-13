import type { ButtonHTMLAttributes } from "react";

type NavItem = {
  label: string;
  icon: string;
};

type NavProps = {
  activeItem?: string;
  onItemClick?: (label: string) => void;
  onAddClick?: () => void;
  className?: string;
};

const navItems: NavItem[] = [
  { label: "홈", icon: "/nav-assets/home.svg" },
  { label: "리스트", icon: "/nav-assets/list.svg" },
  { label: "라운지", icon: "/nav-assets/lounge.svg" },
  { label: "MY", icon: "/nav-assets/person.svg" },
];

function NavButton({
  item,
  active,
  ...props
}: {
  item: NavItem;
  active: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-current={active ? "page" : undefined}
      className="flex h-14 min-w-12 flex-col items-center justify-center gap-0.5 text-xs text-[#b2b2b2] transition-colors hover:text-[#4e000e] focus-visible:rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-700"
      {...props}
    >
      <span
        className="size-6 shrink-0 bg-current"
        style={{
          WebkitMaskImage: `url(${item.icon})`,
          maskImage: `url(${item.icon})`,
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
        aria-hidden="true"
      />
      <span>{item.label}</span>
    </button>
  );
}

function LiquidGlassTexture({ filterId }: { filterId: string }) {
  return (
    <>
      <svg aria-hidden="true" className="absolute size-0">
        <defs>
          <filter
            id={filterId}
            x="-20%"
            y="-40%"
            width="140%"
            height="180%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.045"
              numOctaves="2"
              seed="12"
              result="noise"
            />
            <feGaussianBlur in="noise" stdDeviation="0.7" result="softNoise" />
            <feSpecularLighting
              in="softNoise"
              surfaceScale="3"
              specularConstant="0.45"
              specularExponent="24"
              lightingColor="#ffffff"
              result="specular"
            >
              <feDistantLight azimuth="225" elevation="55" />
            </feSpecularLighting>
            <feComposite
              in="specular"
              in2="SourceGraphic"
              operator="in"
              result="litSurface"
            />
            <feBlend
              in="SourceGraphic"
              in2="litSurface"
              mode="screen"
              result="litGlass"
            />
            <feDisplacementMap
              in="litGlass"
              in2="softNoise"
              scale="8"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <span className="pointer-events-none absolute inset-px overflow-hidden rounded-full opacity-70 mix-blend-screen">
        <span
          className="absolute -inset-[8%]"
          style={{
            filter: `url(#${filterId})`,
            backgroundImage:
              "radial-gradient(ellipse at 18% 12%, rgba(255, 255, 255, 0.34), transparent 34%), linear-gradient(125deg, rgba(255, 255, 255, 0.14), transparent 38%, rgba(255, 255, 255, 0.08) 62%, transparent 78%)",
          }}
        />
      </span>
    </>
  );
}

function GlassNavBackground() {
  return (
    <div
      aria-hidden="true"
      data-node-id="576:359"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-14"
    >
      <div
        data-node-id="576:360"
        className="absolute inset-x-0 top-[3px] h-[47.442px] rounded-full blur-[74px]"
        style={{
          boxShadow:
            "inset 0 4px 64px 12px rgba(0, 0, 0, 0.25), inset -6px 6px 17px rgba(255, 255, 255, 0.8), inset 3px -2px 4px rgba(255, 255, 255, 0.5)",
        }}
      />
      <div
        data-node-id="576:361"
        className="absolute inset-x-0 top-0 h-14 rounded-full bg-white/[0.015]"
        style={{
          WebkitBackdropFilter: "blur(24px) saturate(125%)",
          backdropFilter: "blur(24px) saturate(125%)",
          backgroundImage:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent 46%, rgba(255, 255, 255, 0.025))",
          boxShadow: "inset 0.5px 0.5px 0 rgba(255, 255, 255, 0.18)",
        }}
      />
      <div
        data-node-id="576:362"
        className="absolute inset-x-[5px] top-[5px] h-[45px] rounded-full bg-white/[0.018]"
        style={{
          WebkitBackdropFilter: "blur(18px) saturate(128%)",
          backdropFilter: "blur(18px) saturate(128%)",
          backgroundImage:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.09), transparent 48%, rgba(255, 255, 255, 0.02))",
          boxShadow: "inset 0.5px 0.5px 0 rgba(255, 255, 255, 0.16)",
        }}
      />
      <div
        data-node-id="576:363"
        className="absolute inset-x-[12px] top-[11px] h-[34px] rounded-full bg-white/[0.02]"
        style={{
          WebkitBackdropFilter: "blur(12px) saturate(130%)",
          backdropFilter: "blur(12px) saturate(130%)",
          backgroundImage:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.08), transparent 50%, rgba(255, 255, 255, 0.018))",
          boxShadow: "inset 0.5px 0.5px 0 rgba(255, 255, 255, 0.14)",
        }}
      />
      <div
        data-node-id="576:364"
        className="absolute left-[20px] right-[19px] top-[16px] h-[22px] rounded-full bg-white/[0.02] blur-[10px]"
        style={{
          WebkitBackdropFilter: "blur(1px) saturate(132%)",
          backdropFilter: "blur(1px) saturate(132%)",
          backgroundImage:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.07), transparent 52%, rgba(255, 255, 255, 0.015))",
          boxShadow: "inset 0.5px 0.5px 0 rgba(255, 255, 255, 0.12)",
        }}
      />
      <div
        data-node-id="576:365"
        className="absolute inset-0 overflow-hidden rounded-full bg-[rgba(215,215,215,0.06)]"
        style={{
          WebkitBackdropFilter: "blur(2px) saturate(155%) contrast(110%)",
          backdropFilter: "blur(2px) saturate(155%) contrast(110%)",
          backgroundImage:
            "radial-gradient(ellipse at 18% 0%, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.04) 24%, transparent 48%), linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 42%, rgba(78, 0, 14, 0.02) 76%, rgba(255, 255, 255, 0.06) 100%)",
          boxShadow:
            "inset 1px 1px 0 rgba(255, 255, 255, 0.7), inset -1px -1px 0 rgba(255, 255, 255, 0.14), inset 0 8px 18px rgba(255, 255, 255, 0.06), 0 0 10px 4px rgba(176, 176, 176, 0.2)",
        }}
      >
        <LiquidGlassTexture filterId="bottom-nav-liquid-glass" />
      </div>
    </div>
  );
}

export default function BottomNav({
  activeItem = "홈",
  onItemClick,
  onAddClick,
  className = "",
}: NavProps) {
  return (
    <nav
      aria-label="하단 메뉴"
      data-node-id="595:511"
      className={`fixed left-5 right-5 bottom-[calc(20px+env(safe-area-inset-bottom))] z-50 mx-auto h-[68px] max-w-[390px] ${className}`}
    >
      <GlassNavBackground />

      <div className="absolute inset-x-5 bottom-0 grid h-14 grid-cols-[1fr_1fr_72px_1fr_1fr] items-center">
        {navItems.slice(0, 2).map((item) => (
          <NavButton
            key={item.label}
            item={item}
            active={activeItem === item.label}
            onClick={() => onItemClick?.(item.label)}
          />
        ))}

        <button
          type="button"
          aria-label="추가"
          onClick={onAddClick}
          className="relative -top-1 mx-auto size-16 rounded-full transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-700"
        >
          <span
            aria-hidden="true"
            data-node-id="576:369"
            className="absolute inset-0 overflow-hidden rounded-full bg-[rgba(215,215,215,0.16)]"
            style={{
              WebkitBackdropFilter: "blur(2px) saturate(150%) contrast(108%)",
              backdropFilter: "blur(2px) saturate(150%) contrast(108%)",
              backgroundImage:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 35%, rgba(255, 255, 255, 0) 58%, rgba(78, 0, 14, 0.02) 100%)",
              boxShadow:
                "inset 1px 1px 0 rgba(255, 255, 255, 0.8), inset -1px -1px 0 rgba(255, 255, 255, 0.15), 0 0 5px 1px rgba(119, 119, 119, 0.25)",
            }}
          >
            <LiquidGlassTexture filterId="add-button-liquid-glass" />
          </span>
          <img
            className="absolute left-1/2 top-1/2 size-[34px] -translate-x-1/2 -translate-y-1/2"
            src="/nav-assets/add.svg"
            alt=""
            aria-hidden="true"
          />
        </button>

        {navItems.slice(2).map((item) => (
          <NavButton
            key={item.label}
            item={item}
            active={activeItem === item.label}
            onClick={() => onItemClick?.(item.label)}
          />
        ))}
      </div>
    </nav>
  );
}
