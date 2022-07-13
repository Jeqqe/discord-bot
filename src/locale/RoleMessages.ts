export default {
  addCommandDescription: 'Creates a new guild assignment role',
  removeCommandDescription: 'Removes a guild assignment role',

  labelOptionDescription: 'Displayed name of the new role',
  typeOptionDescription: 'Type of the new role',
  imageUrlOptionDescription: 'Image url used to create a new emoji for the role',
  colorCodeOptionDescription: 'Colorcode without the #. Used when creating a new color type role',
  roleOptionDescription: 'The role you want to remove',

  roleImageUrlError: 'Couldn\'t create new role with the given image URL. Please try another image.',
  roleCreationError: 'Couldn\'t create new role with the given details.',
  roleRemoveError: 'Couldn\'t remove the selected role. Please try again.',
  roleDoesNotExistError: 'Selected role does not exist within the bot.',
  roleAlreadyExistsError: 'Role with the given label already exists',

  roleCreated: 'New role successfully created!',
  roleRemoved: 'Role has been removed!',
  roleCreationReason: 'Automatic role assignment role.',

  gamesAssignmentEmbedTitle: 'Select roles you would like to receive notifications from',
  colorAssignmentEmbedTitle: 'Select a color you would like your name to be',
}
