const addTimedReply = async (replyable, reply, delay) => {
  replyable.reply(reply).then(() => {
    setTimeout(() => replyable.deleteReply(), delay * 1000)
  }).catch((err) => {
    console.log(err)
  })
  return replyable
}

const addEditedTimedReply = async (replyable, reply, delay) => {
  replyable.editReply(reply).then(() => {
    setTimeout(() => replyable.deleteReply(), delay * 1000)
  }).catch((err) => {
    console.log(err)
  })
  return replyable
}

module.exports = { addTimedReply, addEditedTimedReply }
