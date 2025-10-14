package routes

import (
	"net/http"

	"backend/handlers"
	"go.mongodb.org/mongo-driver/mongo"
)

// SetupRoutes mendaftarkan semua endpoint API dan meneruskan koneksi MongoDB
func SetupRoutes(mux *http.ServeMux, db *mongo.Database) {
	mux.HandleFunc("/api/artikel", handlers.GetArtikel(db))
}
