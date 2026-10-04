import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-text section flex flex-col items-center text-center">
      <p className="eyebrow text-muted">404</p>
      <h1 className="display-md mt-4">This Page Could Not Be Found</h1>
      <p className="mt-6 text-muted">
        The piece you are looking for may no longer be available, or the link may be incorrect.
      </p>
      <Link href="/" className="btn btn-primary mt-10">
        Return to the Homepage
      </Link>
    </section>
  );
}
