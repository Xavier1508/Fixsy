package main

import (
	"context"
	"log"
	"net/http"
	"time"

	"backend/config"
	"backend/routes"
	"github.com/rs/cors"
)

func main() {
	db, client, err := config.ConnectDB()
	if err != nil {
		log.Fatal("DB error:", err)
	}
	defer func() {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		if err := client.Disconnect(ctx); err != nil {
			log.Printf("Error disconnecting MongoDB: %v", err)
		}
	}()

	mux := http.NewServeMux()
	routes.SetupRoutes(mux, db) // tetap sama, db dikirim untuk digunakan handler

	// serve static files
	mux.Handle("/public/", http.StripPrefix("/public/", http.FileServer(http.Dir("./public"))))

	// setup CORS
	handler := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000", "http://localhost:5173"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type"},
		AllowCredentials: true,
	}).Handler(mux)

	log.Println("✅ Routes sudah disetup, backend jalan di :4000")
	log.Fatal(http.ListenAndServe(":4000", handler))
}
