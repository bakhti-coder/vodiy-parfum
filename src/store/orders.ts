import request from "@/server";
import { OrdersType } from "@/types/orders";
import { toast } from "react-toastify";
import { create } from "zustand";

interface OrdersData {
    data: OrdersType[];
    loading: boolean;
    btnLoading: boolean;
    btnId: null | string;
    getOrders: () => void;
    conifrmOrders: (id: string) => void;
    cancelOrders: (id: string) => void;
}

const useOrders = create<OrdersData>((set, get) => ({
    data: [],
    loading: false,
    btnLoading: false,
    btnId: null,
    getOrders: async () => {
        try {
            set({loading: true})
            const {data} = await request.get<OrdersType[]>('payment')
            set({data})
        } finally {
            set({loading: false})
        }
    },
    conifrmOrders: async (id) => {
        set({btnId: id})
        try {
            set({btnLoading: true})
            const {data} = await request.post(`payment/${id}`)
            toast.success(data.msg, { autoClose: 1000 });
            get().getOrders()
        } finally {
            set({btnLoading: false})
        }
    },
    cancelOrders: async (id) => {
        set({btnId: id})
        try {
            set({btnLoading: true})
            const {data} = await request.put(`payment/${id}`)
            toast.success(data.msg, { autoClose: 1000 });
            get().getOrders()
        } finally {
            set({btnLoading: false})
        }
    }
}))

export default useOrders