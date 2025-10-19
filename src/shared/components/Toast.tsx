import React, { createContext, useContext, useState, useCallback } from "react";
import { Modal, Pressable, StyleSheet, Animated, Platform } from "react-native";
import { ThemedView } from "@/shared/components/ThemedView";
import { ThemedText } from "@/shared/components/ThemedText";

type ToastType = "success" | "error" | "info";

interface ToastState {
  visible: boolean;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: "",
    type: "info",
  });

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    setToast({ visible: true, message, type });

    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3000);
  }, []);

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  globalToast = { showToast, hideToast };

  const getToastStyle = () => {
    switch (toast.type) {
      case "success":
        return styles.successToast;
      case "error":
        return styles.errorToast;
      default:
        return styles.infoToast;
    }
  };

  const getToastTextStyle = () => {
    switch (toast.type) {
      case "success":
        return styles.successText;
      case "error":
        return styles.errorText;
      default:
        return styles.infoText;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}

      <Modal
        visible={toast.visible}
        transparent
        animationType="fade"
        onRequestClose={hideToast}
      >
        <Pressable style={styles.overlay} onPress={hideToast}>
          <ThemedView style={[styles.toast, getToastStyle()]}>
            <ThemedText style={[styles.toastText, getToastTextStyle()]}>
              {toast.message}
            </ThemedText>
          </ThemedView>
        </Pressable>
      </Modal>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

let globalToast: ToastContextType | null = null;

export const showToast = (message: string, type: ToastType = "info") => {
  if (globalToast) {
    globalToast.showToast(message, type);
  }
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    ...Platform.select({
      ios: {
        paddingBottom: 100,
      },
      android: {
        paddingBottom: 40,
      },
    }),
  },
  toast: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 20,
    maxWidth: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  successToast: {
    backgroundColor: "#4CAF50",
  },
  errorToast: {
    backgroundColor: "#F44336",
  },
  infoToast: {
    backgroundColor: "#2196F3",
  },
  toastText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  successText: {
    color: "#FFFFFF",
  },
  errorText: {
    color: "#FFFFFF",
  },
  infoText: {
    color: "#FFFFFF",
  },
});
