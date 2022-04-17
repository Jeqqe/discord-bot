const addTimedReply = async (replyable, reply, delay) => {
  replyable.reply(reply).then(() => {
    setTimeout(() => replyable.deleteReply(), delay * 1000)
  }).catch((err) => {
    console.log(err)
  })
}

const addEditedTimedReply = async (replyable, reply, delay) => {
  replyable.editReply(reply).then(() => {
    setTimeout(() => replyable.deleteReply(), delay * 1000)
  }).catch((err) => {
    console.log(err)
  })
}

module.exports = { addTimedReply, addEditedTimedReply }
