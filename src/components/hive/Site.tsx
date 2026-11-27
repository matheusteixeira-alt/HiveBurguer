import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Menu, X, MapPin, Clock, Phone, ArrowUpRight } from "lucide-react";
import { categories, gallery, images, products, site, space, type Category } from "@/config/site";

const nav = [
  { href: "#inicio", label: "Início" },
  { href: "#cardapio", label: "Cardápio" },
  { href: "#sobre", label: "Sobre nós" },
  { href: "#espaco", label: "O espaço" },
  { href: "#galeria", label: "Galeria" },
  { href: "#localizacao", label: "Localização" },
];

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && (setShown(true), io.disconnect()), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`reveal ${shown ? "is-shown" : ""} ${className}`}>
      {children}
    </div>
  );
}

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function Logo({ className }: { className: string }) {
  return <img src={images.logo} alt="Hive Burger" className={`rounded-full object-cover ${className}`} />;
}

// Botões com as logos oficiais do Instagram e do iFood.
function SocialIcons({ size = "h-11 w-11" }: { size?: string }) {
  return (
    <div className="flex items-center gap-3">
      <a href={site.instagram} {...ext} aria-label="Instagram da Hive Burger" className="transition-transform hover:-translate-y-0.5 hover:scale-105">
        <img src={images.instagramIcon} alt="" className={`${size} rounded-xl`} width={44} height={44} />
      </a>
      <a href={site.ifood} {...ext} aria-label="Pedir no iFood" className="transition-transform hover:-translate-y-0.5 hover:scale-105">
        <img src={images.ifoodIcon} alt="" className={`${size} rounded-xl`} width={44} height={44} />
      </a>
    </div>
  );
}

function IfoodButton({ className = "", children = "Peça no iFood" }: { className?: string; children?: ReactNode }) {
  return (
    <a href={site.ifood} {...ext} className={`btn-primary gap-3 ${className}`}>
      <img src={images.ifoodIcon} alt="" className="h-6 w-6 rounded-md" width={24} height={24} />
      {children}
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : "bg-transparent"}`}>
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 py-3">
        <a href="#inicio" className="shrink-0" aria-label="Hive Burger — início">
          <Logo className="h-12 w-12" />
        </a>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
          {nav.map((n) => <a key={n.href} href={n.href} className="nav-link">{n.label}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <a href={site.instagram} {...ext} aria-label="Instagram da Hive Burger" className="hidden sm:block transition-transform hover:scale-105">
            <img src={images.instagramIcon} alt="" className="h-10 w-10 rounded-xl" width={40} height={40} />
          </a>
          <IfoodButton className="hidden sm:inline-flex" />
          <button className="grid h-11 w-11 place-items-center lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-5 pb-8 pt-4 lg:hidden">
          {nav.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block border-b border-border py-4 font-display text-3xl uppercase">{n.label}</a>
          ))}
          <IfoodButton className="mt-6 w-full" />
          <div className="mt-6 flex justify-center"><SocialIcons /></div>
        </nav>
      )}
    </header>
  );
}

// Brasas da capa: valores fixos (não aleatórios) para o HTML do servidor e do navegador baterem.
const embers = Array.from({ length: 22 }, (_, i) => ({
  "--x": `${(i * 37 + 11) % 100}%`,
  "--s": `${2 + (i % 3)}px`,
  "--d": `${7 + ((i * 7) % 6)}s`,
  "--delay": `${((i * 1.7) % 9).toFixed(1)}s`,
  "--drift": `${((i % 5) - 2) * 30}px`,
}) as CSSProperties);

export function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-[100svh] items-end overflow-hidden grain">
      <img src={images.heroBurger} alt="Hambúrguer artesanal com queijo derretido" className="hero-img absolute inset-0 h-full w-full object-cover" width={2000} height={1333} fetchPriority="high" />
      <div className="hero-glow absolute inset-0" />
      <div className="absolute inset-0 bg-hero-fade" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {embers.map((e, i) => <span key={i} className="ember" style={e} />)}
      </div>
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-32 md:pb-24">
        <p className="eyebrow mb-5 animate-in fade-in slide-in-from-bottom-4 duration-700">Burger &amp; Fries — Betim/MG</p>
        <h1 className="font-display text-[clamp(3.2rem,11vw,9.5rem)] uppercase leading-[0.86] tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-1000">
          Seu próximo<br /><span className="text-primary">favorito</span> está aqui.
        </h1>
        <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <p className="max-w-md text-lg text-foreground/80">Hambúrgueres artesanais e batatas caprichadas. Escolha o seu e peça em um clique pelo iFood.</p>
          <div className="flex flex-wrap gap-3">
            <IfoodButton>Pedir no iFood</IfoodButton>
            <a href="#cardapio" className="btn-outline">Ver cardápio</a>
          </div>
        </div>
      </div>
      <div className="marquee absolute inset-x-0 bottom-0 border-t border-border bg-background/70 py-2 backdrop-blur" aria-hidden>
        <div className="marquee-track font-display text-sm uppercase tracking-[0.3em] text-muted-foreground">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex shrink-0 gap-10 pr-10">
              {["Hambúrgueres", "✦", "Batatas", "✦", "Peça no iFood", "✦", "Betim/MG", "✦", "Um momento Hive", "✦"].map((w, j) => <span key={j} className={w === "✦" ? "text-primary" : ""}>{w}</span>)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Categories({ onPick }: { onPick: (c: Category) => void }) {
  const Item = ({ c, n, className, imgClass }: { c: (typeof categories)[number]; n: string; className: string; imgClass: string }) => (
    <a href="#cardapio" onClick={() => onPick(c.id)} className={`group relative block overflow-hidden ${className}`}>
      <img src={c.image} alt={c.label} loading="lazy" className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${imgClass}`} />
      <div className="absolute inset-0 bg-card-fade" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
        <div>
          <span className="font-display text-primary text-lg">{n}</span>
          <h3 className="font-display text-4xl uppercase md:text-6xl">{c.label}</h3>
        </div>
        <span className="grid h-12 w-12 shrink-0 place-items-center border border-foreground/40 transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"><ArrowUpRight /></span>
      </div>
    </a>
  );
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:py-32">
      <Reveal className="mb-12 grid gap-4 md:grid-cols-2 md:items-end">
        <h2 className="section-title">Do jeito que<br />bater a vontade.</h2>
        <p className="max-w-sm text-muted-foreground md:justify-self-end">Escolha seu momento e vá direto para o cardápio.</p>
      </Reveal>
      <div className="grid gap-4 md:grid-cols-2">
        {categories.map((c, i) => (
          <Reveal key={c.id} delay={i * 120}>
            <Item c={c} n={String(i + 1).padStart(2, "0")} className="h-[420px] md:h-[620px]" imgClass="" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function MenuSection({ filter, setFilter }: { filter: Category | "todos"; setFilter: (f: Category | "todos") => void }) {
  const list = filter === "todos" ? products : products.filter((p) => p.category === filter);
  const tabs = [{ id: "todos" as const, label: "Todos" }, ...categories];
  return (
    <section id="cardapio" className="scroll-mt-20 bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="section-title">Cardápio</h2>
            <p className="mt-4 max-w-md text-muted-foreground">Os pedidos são feitos pelo iFood. Toque no ícone de qualquer item para pedir.</p>
          </div>
          <div className="flex flex-wrap gap-2" role="tablist">
            {tabs.map((t) => (
              <button key={t.id} role="tab" aria-selected={filter === t.id} onClick={() => setFilter(t.id)} className={`chip ${filter === t.id ? "chip-active" : ""}`}>{t.label}</button>
            ))}
          </div>
        </Reveal>
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 80}>
              <article className="group">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <span className="absolute left-3 top-3 bg-background/85 px-2 py-1 text-[11px] font-semibold uppercase tracking-widest">{categories.find((c) => c.id === p.category)?.label}</span>
                </div>
                <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] gap-4">
                  <div className="min-w-0">
                    <h3 className="font-display text-2xl uppercase leading-tight">{p.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
                  </div>
                  <a href={site.ifood} {...ext} aria-label={`Pedir ${p.name} no iFood`} className="shrink-0 transition-transform hover:-rotate-6 hover:scale-110">
                    <img src={images.ifoodIcon} alt="" className="h-12 w-12 rounded-xl" width={48} height={48} loading="lazy" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-16 flex justify-center"><IfoodButton>Ver cardápio completo no iFood</IfoodButton></div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="sobre" className="scroll-mt-20 mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-12 md:py-36">
      <Reveal className="md:col-span-6">
        <img src={images.ambiente} alt="Deck da Hive Burger com cobertura de palha e luminárias acesas ao pôr do sol" loading="lazy" className="aspect-[4/5] w-full object-cover md:-rotate-2" />
      </Reveal>
      <Reveal className="md:col-span-6 md:self-center" delay={150}>
        <p className="eyebrow mb-6">Sobre a Hive</p>
        <h2 className="section-title">Mais que um lanche.<br /><span className="text-primary">Um momento Hive.</span></h2>
        <p className="mt-8 max-w-lg text-lg text-foreground/80">Na Hive, cada momento merece um sabor especial. Hambúrgueres artesanais no pão brioche, blends suculentos e batatas para dividir (ou não).</p>
        <p className="mt-4 max-w-lg text-lg text-foreground/80">Peça pelo iFood ou venha viver tudo isso pessoalmente: deck ao ar livre, bar e muito espaço para reunir a galera.</p>
      </Reveal>
    </section>
  );
}

export function Space() {
  return (
    <section id="espaco" className="scroll-mt-20 mx-auto max-w-7xl px-5 pb-24 md:pb-32">
      <Reveal className="mb-12 grid gap-4 md:grid-cols-2 md:items-end">
        <h2 className="section-title">O espaço</h2>
        <p className="max-w-sm text-muted-foreground md:justify-self-end">Um lugar para comer bem, conversar e ficar mais um pouco. Venha conhecer.</p>
      </Reveal>
      <div className="grid gap-4 md:grid-cols-3">
        {space.map((p, i) => (
          <Reveal key={p.title} delay={i * 120}>
            <figure className="group relative h-[420px] overflow-hidden md:h-[520px]">
              <img src={p.src} alt={`${p.title} da Hive Burger: ${p.caption}`} loading="lazy" className="h-full w-full object-cover saturate-[0.92] transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-card-fade" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-4xl uppercase">{p.title}</h3>
                <p className="mt-1 text-sm text-foreground/80">{p.caption}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  useEffect(() => {
    if (active === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((a) => (a! + 1) % gallery.length);
      if (e.key === "ArrowLeft") setActive((a) => (a! - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [active]);
  return (
    <section id="galeria" className="scroll-mt-20 bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal><h2 className="section-title mb-12">Galeria</h2></Reveal>
        <div className="grid auto-rows-[200px] grid-flow-dense grid-cols-2 gap-3 md:auto-rows-[240px] md:grid-cols-4">
          {gallery.map((g, i) => (
            <button key={i} onClick={() => setActive(i)} className={`group overflow-hidden ${g.span} ${i === 0 ? "col-span-2 md:col-span-1" : ""}`} aria-label={`Ampliar: ${g.alt}`}>
              <img src={g.src} alt={g.alt} loading="lazy" className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110" />
            </button>
          ))}
        </div>
      </div>
      {active !== null && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-background/95 p-4 animate-in fade-in" onClick={() => setActive(null)} role="dialog" aria-modal="true">
          <button className="absolute right-4 top-4 grid h-12 w-12 place-items-center" aria-label="Fechar"><X /></button>
          <img src={gallery[active]!.src} alt={gallery[active]!.alt} className="max-h-[85vh] max-w-full object-contain animate-in zoom-in-95" />
        </div>
      )}
    </section>
  );
}

export function Location() {
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`;
  return (
    <section id="localizacao" className="scroll-mt-20 mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-12 md:py-32">
      <Reveal className="md:col-span-12">
        <figure className="relative overflow-hidden">
          <img src={images.fachada} alt="Fachada da Hive Burger com o letreiro em neon e coqueiros ao entardecer" loading="lazy" className="h-[240px] w-full object-cover object-[50%_15%] md:h-[420px]" width={1600} height={738} />
          <div className="absolute inset-0 bg-card-fade" />
          <figcaption className="absolute bottom-0 left-0 p-6 text-sm uppercase tracking-[0.25em] text-foreground/90">Procure o letreiro da Hive</figcaption>
        </figure>
      </Reveal>
      <Reveal className="md:col-span-5">
        <h2 className="section-title">Vem pra<br />Hive.</h2>
        <p className="mt-6 max-w-md text-muted-foreground">Peça pelo iFood ou venha viver o momento Hive no nosso espaço.</p>
        <div className="mt-10 space-y-7">
          <div className="flex gap-4"><MapPin className="mt-1 shrink-0 text-primary" /><div><p className="font-semibold">{site.name}</p><p className="text-muted-foreground">{site.address.line1}<br />{site.address.line2}</p></div></div>
          <div className="flex gap-4"><Clock className="mt-1 shrink-0 text-primary" /><div>{site.hours.map((h) => <p key={h.days} className="text-muted-foreground"><span className="text-foreground">{h.days}:</span> {h.time}</p>)}</div></div>
          {site.phone && <div className="flex gap-4"><Phone className="mt-1 shrink-0 text-primary" /><a href={`tel:${site.phone.replace(/\D/g, "")}`} className="hover:text-primary">{site.phone}</a></div>}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href={maps} target="_blank" rel="noopener noreferrer" className="btn-primary">Abrir no Google Maps</a>
          <a href={site.ifood} {...ext} className="btn-outline">Pedir no iFood</a>
        </div>
      </Reveal>
      <Reveal className="md:col-span-7" delay={150}>
        <iframe title="Mapa da Hive Burger" src={`https://maps.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&z=16&output=embed`} className="map-frame h-[380px] w-full border border-border md:h-[520px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-4">
        <Logo className="h-24 w-24" />
        <nav className="flex flex-col gap-2">{nav.map((n) => <a key={n.href} href={n.href} className="text-muted-foreground hover:text-primary">{n.label}</a>)}</nav>
        <div className="text-muted-foreground"><p>{site.address.line1}</p><p>{site.address.line2}</p>{site.phone && <p className="mt-2">{site.phone}</p>}</div>
        <div>
          <p className="mb-3 text-sm text-muted-foreground">Siga e peça</p>
          <SocialIcons />
        </div>
      </div>
      <p className="border-t border-border py-6 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Hive Burger. Todos os direitos reservados.</p>
    </footer>
  );
}
