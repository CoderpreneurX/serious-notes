import { API_ENDPOINTS, INTERNAL_SERVER_ERROR_MESSAGE } from "@/constants/api";
import { api } from "@/lib/api";
import { useToastStore } from "@/store/toastStore";
import { type GetNotesResponse, type Note } from "@/types/notes";
import { useQuery } from "@tanstack/react-query";

export default function useNotes() {
  const showToast = useToastStore((state) => state.showToast);

  return useQuery<Note[]>({
    queryKey: ["notes"], // cache key
    queryFn: fetchNotes, // fetch function
    staleTime: 1000 * 60 * 5, // keep data fresh for 5 min
    retry: 1, // retry once on failure
  });

  async function fetchNotes() {
    try {
      const response = await api.get<GetNotesResponse>(
        API_ENDPOINTS.NOTES.GET_NOTES
      );

      if (response.success) {
        return response.data.results;
      } else {
        return [];
      }
    } catch {
      showToast(INTERNAL_SERVER_ERROR_MESSAGE, "error");
      return [];
    }
  }
}
