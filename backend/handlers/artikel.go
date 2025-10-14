package handlers

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"backend/models"
	"go.mongodb.org/mongo-driver/mongo"
)

// GetArtikel - Handler untuk mengambil semua artikel dari MongoDB
func GetArtikel(db *mongo.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Content-Type", "application/json")

		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		listArtikel, err := models.GetAllArtikel(ctx, db)
		if err != nil {
			http.Error(w, "Database error: "+err.Error(), http.StatusInternalServerError)
			return
		}

		json.NewEncoder(w).Encode(listArtikel)
	}
}
