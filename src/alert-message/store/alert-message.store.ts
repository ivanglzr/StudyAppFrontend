import { create } from "zustand";

interface AlertMessageProps {
  title: string;
  message: string;
  variant: "default" | "destructive";
}

interface Props {
  props: AlertMessageProps;
  isVisible: boolean;
}

interface Actions {
  showAlert: (props: Partial<AlertMessageProps>) => void;
  hideAlert: () => void;
  toggleAlert: () => void;
}

export const useAlertMessageStore = create<Props & Actions>((set, get) => ({
  props: {
    title: "",
    message: "",
    variant: "default",
  },
  isVisible: false,
  showAlert: (props) => {
    const newProps = { ...get().props, ...props };

    set({ props: newProps, isVisible: true });
  },
  hideAlert: () => set({ isVisible: false }),
  toggleAlert: () => set({ isVisible: !get().isVisible }),
}));
