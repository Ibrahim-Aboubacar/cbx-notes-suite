import { toast } from "sonner";

type TToastType = {
    title: string;
    description?: string;
    dismissible?: boolean;
};

export const ToastService = {
    error: (data: TToastType) => {
        toast.error(data.title, { description: data.description, dismissible: data.dismissible });
    },
    success: (data: TToastType) => {
        toast.success(data.title, { description: data.description, dismissible: data.dismissible });
    },
    info: (data: TToastType) => {
        toast.info(data.title, { description: data.description, dismissible: data.dismissible });
    },
    warning: (data: TToastType) => {
        toast.warning(data.title, { description: data.description, dismissible: data.dismissible });
    },
};
