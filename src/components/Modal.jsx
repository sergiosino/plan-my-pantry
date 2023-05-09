import { Text, Modal as ModalRN, View, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function Modal (props) {
  const { isModalOpen, setIsModalOpen, title, children } = props

  const handleClose = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      {/* For the shade of the modal, so it will fade and not slide from the bottom */}
      <ModalRN
        visible={isModalOpen}
        transparent
        animationType='fade'
      >
        <View style={styles.backgroundModal} />
      </ModalRN>
      {/* Modal */}
      <ModalRN
        visible={isModalOpen}
        onRequestClose={handleClose}
        transparent
        animationType='slide'
      >
        <GestureHandlerRootView style={styles.gestureHandlerContainer}>
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <View style={styles.modalTitle}>
                <Text style={{ fontSize: 16 }}>{title}</Text>
              </View>
              {children}
            </View>
          </View>
        </GestureHandlerRootView>
      </ModalRN>
    </>
  )
}

const styles = StyleSheet.create({
  backgroundModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  gestureHandlerContainer: {
    flex: 1
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  modal: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 16,
    paddingHorizontal: 30,
    paddingVertical: 20,
    elevation: 5
  },
  modalTitle: {
    alignItems: 'center',
    marginBottom: 20
  }
})
