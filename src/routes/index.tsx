import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import type { Category } from "@/config/site";
import { About, Categories, Space, Footer, Gallery, Header, Hero, Location, MenuSection } from "@/components/hive/Site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hive Burger — Hambúrgueres artesanais em Betim/MG" },
      { name: "description", content: "Hive Burger em Betim/MG: hambúrgueres artesanais e batatas. Veja o cardápio e peça pelo iFood." },
      { property: "og:title", content: "Hive Burger — Betim/MG" },
      { property: "og:description", content: "Seu próximo favorito está aqui. Hambúrgueres artesanais e batatas no Ingá Alto, Betim." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [filter, setFilter] = useState<Category | "todos">("todos");
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Categories onPick={setFilter} />
        <MenuSection filter={filter} setFilter={setFilter} />
        <About />
        <Space />
        <Gallery />
        <Location />
      </main>
      <Footer />
    </>
  );
}
