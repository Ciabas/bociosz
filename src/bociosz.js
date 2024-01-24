import { prefix } from "./common.js";

export default function (msg) {
  if (msg.content.startsWith(`${prefix}bociosz`)) {
    msg.channel.send(`
    Oto dostępne komendy w ramach bociosza:

    • ${prefix}clear x - pozwala uprawnionym osobistościom czyścić "x" ostatnich wiadomości, domyślnie x=10,
    • ${prefix}roll x - rzut kością, domyślnie x=6,
    • ${prefix}losowanie "adam, ewa, wonsz" - losuje z listy jedną wartość,
    • ${prefix}losowanie "ciastko, kawa" "adam, ewa" - dopasowuje elementy list do siebie,
    • ${prefix}play x - bociosz wbija na kanał głosowy i gra, "x" to ID video z youtube,
    `);
  }
}
