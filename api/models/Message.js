/**
 * Created by kmironchyk on 12/8/2015.
 */
module.exports = {
  attributes: {
    sender: {
      model: "Member"
    },
    text: 'STRING',
    recipients: {
      collection: "Member"
    }
  }
}
