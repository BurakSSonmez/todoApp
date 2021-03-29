import http from "../http-common";

class TodoDataService {
    getAll() {
        return http.get("/todoes");
    }

    get(id) {
        return http.get(`/todoes/${id}`);
    }

    create(data) {
        return http.post("/todoes", data);
    }

    update(id, data) {
        return http.put(`/todoes/${id}`, data);
    }

    delete(id) {
        return http.delete(`/todoes/${id}`);
    }

    deleteAll() {
        return http.delete(`/todoes`);
    }

    findByTitle(title) {
        return http.get(`/todoes?title=${title}`);
    }
}

export default new TodoDataService();