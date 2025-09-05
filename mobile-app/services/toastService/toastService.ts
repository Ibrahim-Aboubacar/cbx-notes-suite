type TToastType = {
    title: string;
    description?: string;
    dismissible?: boolean;
};

export const ToastService = {
    error: (data: TToastType) => {
        alert(data.title);
        console.error("ToastService:error", data.title, { description: data.description, dismissible: data.dismissible });
    },
    success: (data: TToastType) => {
        alert(data.title);
        console.log("ToastService:success", data.title, { description: data.description, dismissible: data.dismissible });
    },
    info: (data: TToastType) => {
        alert(data.title);
        console.info("ToastService:info", data.title, { description: data.description, dismissible: data.dismissible });
    },
    warning: (data: TToastType) => {
        alert(data.title);
        console.log("ToastService:warning", data.title, { description: data.description, dismissible: data.dismissible });
    },
};
