import {
  CommandInteraction, InteractionReplyOptions, Message, MessagePayload, SelectMenuInteraction,
} from 'discord.js'

export const addTimedMessageReply = async (
  replyable: Message,
  reply: string | MessagePayload | InteractionReplyOptions,
  delay: number,
) => {
  replyable.reply(reply).then((replied) => {
    setTimeout(() => replied.delete(), delay * 1000)
  }).catch((err) => {
    console.log(err)
  })
  return replyable
}

export const addTimedInteractionReply = async (
  replyable: CommandInteraction | SelectMenuInteraction,
  reply: string | MessagePayload | InteractionReplyOptions,
  delay: number,
) => {
  replyable.reply(reply).then(() => {
    setTimeout(() => replyable.deleteReply(), delay * 1000)
  }).catch((err) => {
    console.log(err)
  })
  return replyable
}

export const addEditedReply = async (
  replyable: CommandInteraction | SelectMenuInteraction,
  reply: string | MessagePayload | InteractionReplyOptions,
  delay: number,
) => {
  replyable.editReply(reply).then(() => {
    setTimeout(() => replyable.deleteReply(), delay * 1000)
  }).catch((err) => {
    console.log(err)
  })
  return replyable
}
