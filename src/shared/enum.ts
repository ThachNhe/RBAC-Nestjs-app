export enum RoleEnum {
  ADMIN = 'admin',
  USER = 'user',
}

export enum PasswordEnum {
  BANK = 'bank',
  SAFE_BOX = 'safe_box',
  SOCIAL_MEDIA = 'social_media',
  MISCELLANEOUS = 'miscellaneous',
}

export enum AuditLogEnum {
  AUTH_LOGIN = 'auth.login',
  AUTH_REGISTER = 'auth.register',
  AUTH_RESET_PASSWORD = 'auth.reset_password',
  AUTH_CHANGE_PASSWORD = 'auth.change_password',
  USER_GET = 'user.get',
  USER_UPDATE = 'user.update',
  USER_DELETE = 'user.delete',
  PASSWORD_CREATE = 'password.create',
  PASSWORD_UPDATE = 'password.update',
  PASSWORD_DELETE = 'password.delete',
  CREATE_PIN = 'create_pin',
  UPDATE_PIN = 'update_pin',
  SHARED_ACCESS_USER_GET = 'shared_access_user_get',
}

export enum BucketTypeEnum {
  WILLS = 'wills',
  TRUSTS = 'trusts',
  IMAGE = 'image',
  NOTE = 'note',
  GUARDIAN_DOC = 'guardian_doc',
  DOCUMENT = 'document',
  AVATAR = 'avatar'
}

export enum DocumentFileName {
  WILLS = 'Living Will',
  GUARDIAN_DOC = 'Guardianship Emergency Plan',
  TRUST = 'Deed to Shed',
}

export enum S3AccessControl {
  PRIVATE = 'private',
  PUBLIC_READ = 'public-read',
  PUBLIC_READ_WRITE = 'public',
}

export enum RelationshipType {
  FATHER = 'father',
  MOTHER = 'mother',
  GRANDMA = 'grandma',
  SIBLING = 'sibling',
  AUNT = 'aunt',
  UNCLE = 'uncle',
  COUSIN = 'cousin',
  CHILD = 'child',
  PARTNER = 'partner',
  FRIEND = 'friend',
  TRUSTEE = 'trustee',
  GRANTOR = 'grantor',
  BENEFICIAL = 'beneficial',
}

export enum PlanTypeEnum {
  BURIAL = 'Burial',
  CREMATION = 'Cremation',
}

export enum ShareAccessEnums {
  CAN_VIEW_PLANNINGS = 'canViewPlanning',
  CAN_VIEW_DOCUMENTS = 'canViewDocument',
  CAN_VIEW_PHOTOS = 'canViewPhoto',
  CAN_VIEW_PLAYLISTS = 'canViewPlaylist',
  CAN_VIEW_NOTES = 'canViewNote',
  CAN_VIEW_PASSWORD = 'canViewPassword',
  CAN_VIEW_SONG = 'canViewSong',
}

export enum NoteTypeEnum {
  FILE = 'file',
  TEXT = 'text',
}

export enum AccessTypeNum {
  ADMIN = 1,
  VIEWER = 2,
}

export enum SensitiveDataEnum {
  NOTE = 'note',
  PASSWORD = 'password',
}
