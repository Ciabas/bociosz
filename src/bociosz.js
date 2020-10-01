// TODO: --help
export default function (msg) {
  if (msg.content.match(/^!bociosz/)) {
    msg.channel.send(`
    Oto dostępne komendy w ramach bociosza:

    !clear x - pozwala uprawnionym osobistościom czyścić x ostatnich wiadomości, domyślnie x=10,
    !roll x - rzut kością, domyślnie x=6,
    !losowanie "adam, ewa, wonsz" - losuje z listy jedną wartość,
    !losowanie "ciastko, kawa" "adam, ewa" - dopasowuje elementy list do siebie,
    `)
  }
}
