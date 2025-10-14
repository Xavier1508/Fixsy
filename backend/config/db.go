package config

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// ConnectDB connects to MongoDB and returns the database + client
func ConnectDB() (*mongo.Database, *mongo.Client, error) {
	uri := GetEnv("MONGO_URI", "mongodb://localhost:27017")
	dbName := GetEnv("DB_NAME", "fixsydb")

	clientOpts := options.Client().ApplyURI(uri)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, clientOpts)
	if err != nil {
		return nil, nil, fmt.Errorf("failed to connect MongoDB: %v", err)
	}

	// Ping database to verify connection
	if err := client.Ping(ctx, nil); err != nil {
		return nil, nil, fmt.Errorf("MongoDB ping failed: %v", err)
	}

	log.Println("✅ Connected to MongoDB successfully")

	db := client.Database(dbName)
	return db, client, nil
}
