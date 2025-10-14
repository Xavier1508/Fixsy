package config

import "os"

// GetEnv gets an environment variable or returns the fallback value.
func GetEnv(key, fallback string) string {
	if val, ok := os.LookupEnv(key); ok {
		return val
	}
	return fallback
}
