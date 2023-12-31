export type CheckListData = {
  weekNumber: number
  content: string
}

export type CheckList = {
  id: number
  data: CheckListData
  checked: boolean
}

export type CheckListGroupByWeek = {
  weekNumber: number
  checkLists: CheckList[]
}

export enum ChecklistsMode {
  ModeEdit = 'MODE_EDIT',
  ModeCheck = 'MODE_CHECK',
}

export type SnackbarActivation = {
  onDismiss?: () => void
  action: {
    label: JSX.Element | string
    onPress: () => void
  }
  label: JSX.Element | string
}
