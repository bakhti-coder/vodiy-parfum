import request from "@/server";
import { ProductsImage } from "@/types/products";
import { toast } from "react-toastify";
import { create } from "zustand";

const crud = <T>(url: string) => {
  interface DataState {
    data: T[];
    categories: T[];
    dataUser: T[];
    loading: boolean;
    total: number;
    search: string;
    categoryId: string | null;
    page: number;
    pageSize: number;
    selected: null | string;
    isModalLoading: boolean;
    isModalOpen: boolean;
    btnLoading: boolean;
    btnId: string | null;
    photoLoading: boolean;
    photo: ProductsImage | null;
    loadingRole: boolean;
    userId: string;
    closeModal: () => void;
    categoryIdFunc: (id: string) => void;
    showModal: (form: any) => void;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlePage: (page: number) => void;
    handleUser: (id: string | undefined) => void;
    getData: () => void;
    getCategory: () => void;
    uploadPhoto: (photo: any) => void;
    handleOk: (data: any, reset: any) => void;
    handleEdit: (id: string, form: any) => void;
    handleDelete: (id: string) => void;
    getUserData: () => void;
  }

  return create<DataState>((set, get) => ({
    data: [],
    dataUser: [],
    categories: [],
    loading: false,
    total: 0,
    search: "",
    page: 1,
    pageSize: 1,
    categoryId: null,
    categoryIdFunc: (id) => {
      set({ categoryId: id });
      get().getData();
    },
    selected: null,
    isModalLoading: false,
    isModalOpen: false,
    btnLoading: false,
    photoLoading: false,
    photo: null,
    btnId: null,
    loadingRole: false,
    userId: "",
    closeModal: () => {
      set((state) => ({ ...state, isModalOpen: false }));
    },
    showModal: (reset) => {
      set((state) => ({ ...state, isModalOpen: true }));
      set((state) => ({ ...state, selected: null }));
      set({ photo: null });
      reset()
    },
    handlePage: (page) => {
      set((state) => ({ ...state, page: page }));
      get().getData();
      get().getUserData();
    },
    handleSearch: (e) => {
      set((state) => ({ ...state, search: e.target.value }));
      get().getData();
      get().getUserData();
    },
    handleUser: (id) => {
      set({ userId: id });
    },
    getData: async () => {
      const { search } = get();
      const { page } = get();
      const { categoryId } = get();

      try {
        set((state) => ({ ...state, loading: true }));
        const {
          data: { total, products },
        } = await request.get<{
          total: number;
          products: T[];
        }>(url, {
          params: {
            page,
            search,
            category: categoryId ? categoryId : undefined,
          },
        });

        const pageSize = Math.ceil(total / 10);

        set({ data: products });
        set({ pageSize });
        set({ total });
      } finally {
        set((state) => ({ ...state, loading: false }));
      }
    },
    getUserData: async () => {
      const { search } = get();
      const { page } = get();

      try {
        set((state) => ({ ...state, loading: true }));
        const {
          data: { total, users },
        } = await request.get<{
          total: number;
          users: T[];
        }>(url, {
          params: {
            page,
            search,
          },
        });

        const pageSize = Math.ceil(total / 10);

        set({ dataUser: users });
        set({ pageSize });
        set({ total });
      } finally {
        set((state) => ({ ...state, loading: false }));
      }
    },
    getCategory: async () => {
      const { search } = get();
      const { page } = get();

      try {
        set((state) => ({ ...state, loading: true }));
        const { data } = await request.get(url);
        set({ categories: data });
      } finally {
        set((state) => ({ ...state, loading: false }));
      }
    },
    uploadPhoto: async (e) => {
      set({ photo: null });
      try {
        set({ photoLoading: true });
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        const { data } = await request.post("upload", formData);
        set({ photo: data });
      } finally {
        set({ photoLoading: false });
      }
    },
    handleOk: async (data, reset) => {
      const { selected } = get();
      try {
        if (selected === null) {
          set((state) => ({ ...state, isModalLoading: true }));
          await request.post(url, data);
          toast.success(`Muvaffaqiyatli qo'shildi`, { autoClose: 1000 });
        } else {
          set((state) => ({ ...state, isModalLoading: true }));
          await request.put(`${url}/${selected}`, data);
          toast.success(`Muvaffaqiyatli yangilandi`, { autoClose: 1000 });
        }
        reset();
        data.category = "";
        data.name = "";
        set({ selected: null });
        set({ photo: null });
        get().getData();
        get().getCategory();
        get().getUserData();
        get().closeModal();
      } finally {
        set((state) => ({ ...state, isModalLoading: false }));
      }
    },
    handleEdit: async (id, setValue) => {
      try {
        set((state) => ({ ...state, selected: id }));
        set((state) => ({ ...state, loading: true }));
        const { data } = await request.get(`${url}/${id}`);
        set((state) => ({ ...state, isModalOpen: true }));
        // Products
        setValue("title", data.title);
        setValue("quantity", data.quantity);
        setValue("price", data.price);
        setValue("name", data?.name);
        set({ photo: data.image });
        // Users
        setValue("firstName", data.firstName);
        setValue("lastName", data.lastName);
        setValue("phoneNumber", data.phoneNumber);
        setValue("username", data?.username);
        set({ photo: data.image });
      } finally {
        set((state) => ({ ...state, loading: false }));
      }
    },
    handleDelete: async (id) => {
      try {
        set((state) => ({ ...state, btnLoading: true }));
        set((state) => ({ ...state, btnId: id }));
        const { data } = await request.delete(`${url}/${id}`);
        get().getData();
        get().getCategory();
        get().getUserData();
        toast.success(`Muvaffaqiyatli o'chirildi`, { autoClose: 1000 });
      } finally {
        set((state) => ({ ...state, btnLoading: false }));
      }
    },
  }));
};

export default crud;
