import { useContext, useMemo } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Store } from '../../lib/context/store'
import ChecklistItem from './checklist-item'
import { CheckList, CheckListGroupByWeek } from '../../lib/types'
import NoChecklist from './no-checklist'

const checklistContentsStyle = StyleSheet.create({
  container: {
    paddingVertical: 28,
    paddingHorizontal: 20,
  },
})

const CheckListContents = () => {
  const {
    checkListGroupByWeeks,
    selectedWeek,
    setCheckListGroupByWeeks,
    setSnackbarActivation,
  } = useContext(Store)
  const checklists = useMemo(() => {
    return selectedWeek && checkListGroupByWeeks[selectedWeek - 1]
      ? checkListGroupByWeeks[selectedWeek - 1].checkLists
      : ([] as CheckList[])
  }, [selectedWeek, checkListGroupByWeeks])
  const onPressClick = (checkList: CheckList, idx: number) => {
    const newCheckListGroupByWeek: CheckListGroupByWeek = {
      weekNumber: selectedWeek as number,
      checkLists: [...checklists],
    }
    newCheckListGroupByWeek.checkLists[idx] = {
      ...checkList,
      checked: !checkList.checked,
    }
    const newCheckListGroupByWeeks = [...checkListGroupByWeeks]
    newCheckListGroupByWeeks[(selectedWeek || 0) - 1] = newCheckListGroupByWeek
    setCheckListGroupByWeeks(newCheckListGroupByWeeks)
  }
  const onPressDelete = (checkList: CheckList, idx: number) => {
    const actionLabel = () => <Text style={{ color: 'red' }}>undo</Text>
    const checkListIdxForBackup = [...checklists].findIndex(
      item => item.id == checkList.id,
    )
    const newCheckListGroupByWeek: CheckListGroupByWeek = {
      weekNumber: selectedWeek as number,
      checkLists: [...checklists].filter(item => item.id !== checkList.id),
    }
    setTimeout(() => {
      const newCheckListGroupByWeeks = [...checkListGroupByWeeks]
      newCheckListGroupByWeeks[(selectedWeek || 0) - 1] =
        newCheckListGroupByWeek
      setCheckListGroupByWeeks(newCheckListGroupByWeeks)
    }, 250)
    setSnackbarActivation({
      label: 'Checklist deleted',
      action: {
        label: actionLabel(),
        onPress: () => {
          newCheckListGroupByWeek.checkLists.splice(
            checkListIdxForBackup,
            0,
            checkList,
          )
          const newCheckListGroupByWeeks = [...checkListGroupByWeeks]
          newCheckListGroupByWeeks[(selectedWeek || 0) - 1] =
            newCheckListGroupByWeek
          setCheckListGroupByWeeks(newCheckListGroupByWeeks)
        },
      },
    })
  }
  return (
    <View style={[checklistContentsStyle.container]}>
      {checklists.length > 0 ? (
        checklists.map((checklist, idx) => (
          <ChecklistItem
            onPressCheck={item => onPressClick(item, idx)}
            key={`checklist-${checklist.id}`}
            checklistItem={checklist}
            onPressDelete={item => onPressDelete(item, idx)}
          />
        ))
      ) : (
        <NoChecklist />
      )}
    </View>
  )
}

export default CheckListContents
