import Link from "next/link";

type Props = {
  eyebrow?: string;
  title: string;
  action?: { label: string; href: string };
};

export function SectionHeading({ eyebrow, title, action }: Props) {
  return (
    <div className="mb-8 flex items-end justify-between gap-6 md:mb-12">
      <div>
        {eyebrow && <p className="eyebrow text-muted">{eyebrow}</p>}
        <h2 className="display-md mt-3">{title}</h2>
      </div>
      {action && (
        <Link href={action.href} className="link-nav shrink-0">
          {action.label}
        </Link>
      )}
    </div>
  );
}
