export default function Ribbon() {
  const items = [
    "BRANDING",
    "WEBSITES",
    "CONTENT",
    "DIGITAL MARKETING",
    "BRANDS THAT BLOOM",
    "BRANDING",
    "WEBSITES",
    "CONTENT",
    "DIGITAL MARKETING",
    "BRANDS THAT BLOOM",
  ];

  return (
    <div
      aria-label="Our creative disciplines"
      className="relative overflow-hidden py-4 bg-[#171514] text-[#F7F3EC] border-y border-[#B08A57]/30"
    >
      <div className="flex w-max animate-marquee space-x-8 whitespace-nowrap">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-8 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase"
          >
            <span className="text-[#F7F3EC]">{item}</span>
            <span className="text-[#B08A57] text-sm">✧</span>
          </div>
        ))}
      </div>
    </div>
  );
}

