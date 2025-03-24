
// I know you may think this is an overloaded, but in some situations with the backend team, this helps a a lot.
// In case of the spelling of any field has been changed from the backend, we just can edit here only and quickly.
// Also, in case there is no clear documentation between us and the backend team, and the Apis are not completed yet, we can deal with our own names for fields until we get the final names.  

export enum TASK_FIELDS {
  ID = 'id',
  TITLE = 'title',
  DESCRIPTION = 'description',
  STATUS = 'status',
  DUE_DATE = 'dueDate',
  PRIORITY = 'priority',
}


export enum TASK_PRIORITY {
  LOW = "1",
  MEDIUM = "2",
  HIGH = "3",
  URGENT = "4",
}