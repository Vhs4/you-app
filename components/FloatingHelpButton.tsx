"use client"

import { useState } from "react"
import { TouchableOpacity, Text } from "react-native"
import HelpModal from "./HelpModal"

export default function FloatingHelpButton() {
    const [modalVisible, setModalVisible] = useState(false)

    const openModal = () => {
        setModalVisible(true)
    }

    const closeModal = () => {
        setModalVisible(false)
    }

    return (
        <>
            {/* Floating Button */}
            <TouchableOpacity
                onPress={openModal}
                className="absolute bottom-20 right-6 bg-emerald-400 w-14 h-14 rounded-2xl items-center justify-center shadow-lg"
                style={{
                    elevation: 8,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                }}
            >
                <Text className="text-white text-xl font-black">U</Text>
            </TouchableOpacity>

            {/* Help Modal */}
            <HelpModal visible={modalVisible} onClose={closeModal} />
        </>
    )
}
