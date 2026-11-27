// Configuração central da Hive Burger — edite aqui os dados reais.
import espacoDeck from "@/assets/espaco-deck.webp";
import espacoBar from "@/assets/espaco-bar.webp";
import espacoSalao from "@/assets/espaco-salao.webp";
import espacoExterna from "@/assets/espaco-externa.jpg";
import espacoFachada from "@/assets/espaco-fachada.jpg";
import logo from "@/assets/hive-logo.png";
import instagramIcon from "@/assets/icon-instagram.png";
import ifoodIcon from "@/assets/icon-ifood.png";
import heroHive from "@/assets/hero-hive.jpg";
import hiveTexas from "@/assets/burger-hive-texas.jpg";
import honeyHive from "@/assets/burger-honey-hive.jpg";
import hiveCheddar from "@/assets/burger-hive-cheddar.jpg";
import doubleSmash from "@/assets/burger-double-smash.jpg";
import hiveCrisp from "@/assets/burger-hive-crisp.jpg";
import cheeseBurguer from "@/assets/burger-cheese-burguer.jpg";
import hiveFries from "@/assets/batata-hive-fries.jpg";
import batataCheddar from "@/assets/batata-cheddar.jpg";
import batataFrita from "@/assets/batata-frita.jpg";
import galeriaRucula from "@/assets/galeria-rucula.jpg";
import galeriaBaconSalada from "@/assets/galeria-bacon-salada.jpg";
import galeriaOnionStraw from "@/assets/galeria-onion-straw.jpg";
import galeriaCorte from "@/assets/galeria-corte.jpg";
import galeriaCrispBacon from "@/assets/galeria-crisp-bacon.jpg";

export const site = {
  name: "Hive Burger",
  // Os pedidos são feitos somente pelo iFood.
  ifood: "https://www.ifood.com.br/delivery/betim-mg/hive-burger---hamburgueria-artesanal-inga-alto/b8ef5097-b7d9-4168-9ad7-892a5bdcdcb5",
  instagram: "https://www.instagram.com/hive.burger/",
  phone: "", // ex: "(31) 99999-9999"
  address: {
    line1: "Av. Teotônio Parreira Coelho, 515",
    line2: "Ingá Alto — Betim/MG",
  },
  mapsQuery: "Av. Teotônio Parreira Coelho, 515, Ingá Alto, Betim - MG",
  hours: [
    { days: "Terça a Sexta", time: "18h às 23h" },
    { days: "Sábado e Domingo", time: "11h às 23h" },
    { days: "Segunda", time: "Fechado" },
  ],
};

export type Category = "hamburgueres" | "batatas";

export const categories: { id: Category; label: string; image: string }[] = [
  { id: "hamburgueres", label: "Hambúrgueres", image: doubleSmash },
  { id: "batatas", label: "Batatas", image: batataCheddar },
];

export type Product = {
  id: string;
  name: string;
  description: string;
  category: Category;
  image: string;
};

// Sem preços: cada item leva para o iFood. Descrições escritas a partir das fotos — confirme os ingredientes.
export const products: Product[] = [
  { id: "hive-texas", name: "Hive Texas", description: "Blend bovino, carne desfiada cremosa, molho barbecue e onion straw crocante.", category: "hamburgueres", image: hiveTexas },
  { id: "honey-hive", name: "Honey Hive", description: "Blend bovino, queijo derretido e bacon crocante caramelizado no mel.", category: "hamburgueres", image: honeyHive },
  { id: "hive-cheddar", name: "Hive Cheddar", description: "Blend bovino, cheddar cremoso, cebola grelhada, farofa de bacon e maionese da casa.", category: "hamburgueres", image: hiveCheddar },
  { id: "double-smash", name: "Double Smash", description: "Dois blends, muito cheddar, cebola caramelizada e bacon.", category: "hamburgueres", image: doubleSmash },
  { id: "hive-crisp", name: "Hive Crisp", description: "Frango empanado crocante, alface americana e maionese temperada.", category: "hamburgueres", image: hiveCrisp },
  { id: "cheese-burguer", name: "Cheese Burguer", description: "Blend bovino, queijo derretido e ketchup no pão brioche.", category: "hamburgueres", image: cheeseBurguer },
  { id: "hive-fries", name: "Hive Fries", description: "Batatas fritas com carne desfiada, maionese temperada, jalapeño e cebolinha.", category: "batatas", image: hiveFries },
  { id: "batata-cheddar", name: "Batata com Cheddar", description: "Batatas fritas cobertas com cheddar cremoso e farofa de bacon.", category: "batatas", image: batataCheddar },
];

// Grade de 4 colunas × 3 linhas no desktop.
export const gallery: { src: string; alt: string; span: string }[] = [
  { src: galeriaRucula, alt: "Hambúrguer com queijo, rúcula e geleia de bacon", span: "md:row-span-2" },
  { src: galeriaBaconSalada, alt: "Hambúrguer com queijo derretido, bacon e salada", span: "md:col-span-2" },
  { src: galeriaOnionStraw, alt: "Hambúrguer com cheddar, bacon e onion straw", span: "md:row-span-2" },
  { src: galeriaCorte, alt: "Hambúrguer cortado ao meio mostrando o recheio", span: "md:col-span-2" },
  { src: galeriaCrispBacon, alt: "Sanduíche de frango crocante com bacon, batata e refrigerante", span: "md:col-span-2" },
  { src: batataFrita, alt: "Batata frita na caixa da Hive Burger", span: "" },
  { src: hiveFries, alt: "Batata com carne desfiada, maionese, jalapeño e cebolinha", span: "" },
];

// Fotos reais do espaço da Hive.
export const space: { src: string; title: string; caption: string }[] = [
  { src: espacoBar, title: "Bar", caption: "Balcão iluminado, drinks e telões." },
  { src: espacoSalao, title: "Salão", caption: "Mesas entre a palmeira e as samambaias." },
  { src: espacoExterna, title: "Área externa", caption: "Guarda-sóis com vista para as quadras." },
];

export const images = { heroBurger: heroHive, ambiente: espacoDeck, fachada: espacoFachada, logo, instagramIcon, ifoodIcon };


