import api from "../api";

export const getRecommendedMovies = async (movieId: string) => {
    try {
        const { data } = await api.get(`/movie/${movieId}/recommendations`
        );
        return data;
    } catch (error) {
        throw error;
    }
};
           