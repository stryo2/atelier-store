import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="square"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const SearchIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="m15.5 15.5 5 5" />
  </Icon>
);

export const UserIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
  </Icon>
);

export const HeartIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20Z" />
  </Icon>
);

export const BagIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4.5 8h15l-1 13h-13l-1-13Z" />
    <path d="M8.5 10V6.5a3.5 3.5 0 0 1 7 0V10" />
  </Icon>
);

export const MenuIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 7h18M3 12h18M3 17h18" />
  </Icon>
);

export const CloseIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m5 5 14 14M19 5 5 19" />
  </Icon>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Icon width="16" height="16" {...p}>
    <path d="M4 12h16m-6-6 6 6-6 6" />
  </Icon>
);
