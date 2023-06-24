import { EmbedBuilder } from "discord.js";
import { Card } from "scryfall-sdk";
import {
  formatPrices,
  getColorIdentity,
  getFormattedDescription,
  getLegalityString,
} from "./formatting";

export const createCardEmbed = (card: Card): EmbedBuilder => {
  const embed = new EmbedBuilder()
    .setTitle(card.name)
    .setDescription(getFormattedDescription(card))
    .setURL(`${card.scryfall_uri}`)
    .setColor(getColorIdentity(card))
    .addFields({ name: "Prices", value: formatPrices(card), inline: true })
    .addFields({ name: "Legalities", value: getLegalityString(card), inline: true })
    .addFields({ name: "Type", value: card.type_line });

  if (card.image_uris?.normal) {
    embed.setImage(`${card.getImageURI("normal")}`);
  }
  
  if (card.mana_cost) {
    embed.addFields({ name: "Cost", value: `${card.getCost()}`, inline: true });
  }

  if (card.power && card.toughness) {
    embed.addFields({
      name: "Stats",
      value: `${card.power}/${card.toughness}`,
      inline: true
    });
  }

  if (card.loyalty) {
    embed.addFields({ name: "Loyalty", value: `${card.loyalty}`, inline: true });
  }

  return embed;
};

export const createMultiCardEmbeds = (cards: Card[]): EmbedBuilder[] => {
  const embeds: EmbedBuilder[] = cards.map((card) => new EmbedBuilder()
    .setURL("https://scryfall.com/").setImage(card.image_uris?.normal || "")
  );

  embeds[0].setTitle(`Found ${cards.length} cards:`);

  return embeds;
}

export const createArtEmbed = (card: Card): EmbedBuilder => {
  const embed = new EmbedBuilder()
    .setTitle(`${card.name} — ${card.set.toUpperCase()}`)
    .setURL(`${card.scryfall_uri}`)
    .setImage(`${card.image_uris?.art_crop}`)
    .setFooter({ text: `${card.artist || ""} — ™ and © Wizards of the Coast` })

  return embed;
}
