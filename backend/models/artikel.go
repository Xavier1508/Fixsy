package models

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

// Struktur Artikel
type Artikel struct {
	ID      string `bson:"_id,omitempty" json:"id"`
	Title   string `bson:"title" json:"title"`
	Content string `bson:"content" json:"content"`
	Author  string `bson:"author" json:"author"`
}

// Ambil semua artikel dari koleksi "artikel"
func GetAllArtikel(ctx context.Context, db *mongo.Database) ([]Artikel, error) {
	collection := db.Collection("artikel")

	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var artikels []Artikel
	if err := cursor.All(ctx, &artikels); err != nil {
		return nil, err
	}

	return artikels, nil
}
