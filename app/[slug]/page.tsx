import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { policies, getPolicy, policiesUpdated } from "@/data/policies";

type Props = { params: Promise<{ slug: string }> };

// Chỉ các trang trong data/policies.tsx; đường dẫn khác ra trang 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return policies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getPolicy(slug);
  if (!p) return {};
  return { title: p.title, description: p.description, alternates: { canonical: `/${p.slug}` } };
}

export default async function PolicyPage({ params }: Props) {
  const { slug } = await params;
  const p = getPolicy(slug);
  if (!p) notFound();

  return (
    <div className="container section">
      <nav className="crumbs">
        <Link href="/">Trang chủ</Link> / <span>{p.title}</span>
      </nav>
      <div className="policy-layout">
        <article className="policy">
          <h1>{p.title}</h1>
          <p className="policy-updated">Cập nhật: {policiesUpdated}</p>
          {p.body}
        </article>
        <aside className="policy-nav">
          <h4>Chính sách cửa hàng</h4>
          {policies.map((x) => (
            <Link key={x.slug} href={`/${x.slug}`} className={x.slug === p.slug ? "active" : undefined}>{x.title}</Link>
          ))}
        </aside>
      </div>
    </div>
  );
}
