import { View, Text, StyleSheet, Pressable } from 'react-native'
import { flexShortcuts } from '../../lib/styles'
import { useCallback, useContext } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { Store } from '../../lib/context/store'
import { ChecklistsMode } from '../../lib/types'

const appHeaderStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  title: {
    color: '#333',
    fontSize: 16,
    fontWeight: '700',
  },
  button: {
    width: 28,
    color: '#333',
    fontWeight: '400',
  },
})

const AppHeader = ({
  isDarkMode,
  label,
}: {
  isDarkMode: boolean
  label: string
}) => {
  const { checklistMode, onChangeChecklistMode } = useContext(Store)
  const onPress = useCallback((mode: ChecklistsMode) => {
    onChangeChecklistMode(
      mode === ChecklistsMode.ModeCheck
        ? ChecklistsMode.ModeEdit
        : ChecklistsMode.ModeCheck,
    )
  }, [])
  return (
    <View
      style={[
        flexShortcuts.justifyBetween,
        appHeaderStyle.container,
        { backgroundColor: isDarkMode ? Colors.darker : 'white' },
      ]}>
      <View style={[{ width: 40 }]}></View>
      <Text style={[appHeaderStyle.title]}>{label}</Text>
      <Pressable
        onPress={() => onPress(checklistMode)}
        style={{
          width: 40,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>
          {checklistMode === ChecklistsMode.ModeCheck ? 'Edit' : 'Done'}
        </Text>
      </Pressable>
    </View>
  )
}

export default AppHeader
