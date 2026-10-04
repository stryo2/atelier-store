import { services } from "@/lib/sample-data";

export function Services() {
  return (
    <section className="container-wide section">
      <ul className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <li
            key={s.title}
            className={`border-b border-line py-8 sm:px-6 lg:border-b-0 lg:py-10 ${
              i % 2 === 0 ? "sm:pl-0" : "sm:border-l"
            } ${i > 0 ? "lg:border-l lg:pl-6" : "lg:pl-0"}`}
          >
            <h3 className="label">{s.title}</h3>
            <p className="meta mt-3 max-w-xs">{s.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
