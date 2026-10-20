import type { StaticImageData } from "next/image";
import bano from "../../public/bano.jpg";
import cocina from "../../public/cocina.jpg";
import comedor from "../../public/comedor.jpg";
import dormitorioDobleArmario from "../../public/dormitorio-doble-armario.jpg";
import dormitorioDoble from "../../public/dormitorio-doble.jpg";
import dormitorioIndividualArmario from "../../public/dormitorio-individual-armario.jpg";
import dormitorioIndividual from "../../public/dormitorio-individual.jpg";
import escritorio from "../../public/escritorio.jpg";
import fachada from "../../public/fachada.jpg";
import recibidor from "../../public/recibidor.jpg";
import rinconCafe from "../../public/rincon-cafe.jpg";
import salaEscalera from "../../public/sala-escalera.jpg";
import salonTelevision from "../../public/salon-television.jpg";
import salon from "../../public/salon.jpg";

// label: short name shown as a caption; alt: full description for screen readers.
export type Photo = { src: StaticImageData; alt: string; label: string };

export const photos = {
  fachada: {
    src: fachada,
    alt: "Fachada blanca de la casa con contraventanas verdes, palmeras y jardín",
    label: "Fachada y jardín",
  },
  salon: {
    src: salon,
    alt: "Salón con sofá azul, sillón rosa y ventanas al jardín",
    label: "Salón",
  },
  salonTelevision: {
    src: salonTelevision,
    alt: "Salón con televisión, mueble bajo y palmera",
    label: "Salón",
  },
  cocina: {
    src: cocina,
    alt: "Cocina equipada con azulejos de flores y mesa redonda",
    label: "Cocina",
  },
  comedor: {
    src: comedor,
    alt: "Comedor con mesa redonda, frigorífico retro y cafetera",
    label: "Comedor",
  },
  dormitorioDoble: {
    src: dormitorioDoble,
    alt: "Dormitorio con cama de matrimonio y cabecero rosa",
    label: "Dormitorio de matrimonio",
  },
  dormitorioDobleArmario: {
    src: dormitorioDobleArmario,
    alt: "Armario de bambú y silla rosa en el dormitorio",
    label: "Dormitorio de matrimonio",
  },
  dormitorioIndividual: {
    src: dormitorioIndividual,
    alt: "Dormitorio con dos camas individuales",
    label: "Dormitorio con dos camas",
  },
  dormitorioIndividualArmario: {
    src: dormitorioIndividualArmario,
    alt: "Armario blanco con espejo y silla de rejilla",
    label: "Dormitorio con dos camas",
  },
  bano: {
    src: bano,
    alt: "Baño con espejo redondo iluminado y mueble verde",
    label: "Baño",
  },
  salaEscalera: {
    src: salaEscalera,
    alt: "Sala con escalera blanca, palmera y alfombra de yute",
    label: "Sala de la escalera",
  },
  escritorio: {
    src: escritorio,
    alt: "Escritorio de madera con las letras BEL y silla azul",
    label: "Rincón de trabajo",
  },
  recibidor: {
    src: recibidor,
    alt: "Recibidor con consola de rejilla, lámpara y el logo enmarcado",
    label: "Recibidor",
  },
  rinconCafe: {
    src: rinconCafe,
    alt: "Rincón del café con cafetera de cápsulas",
    label: "Rincón del café",
  },
} satisfies Record<string, Photo>;

// Order of the gallery on the page.
export const gallery: Photo[] = [
  photos.fachada,
  photos.salon,
  photos.salonTelevision,
  photos.cocina,
  photos.comedor,
  photos.dormitorioDoble,
  photos.dormitorioDobleArmario,
  photos.dormitorioIndividual,
  photos.dormitorioIndividualArmario,
  photos.bano,
  photos.salaEscalera,
  photos.escritorio,
  photos.recibidor,
  photos.rinconCafe,
];
