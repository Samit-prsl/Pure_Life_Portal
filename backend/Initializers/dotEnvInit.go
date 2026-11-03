package initializers

import (
	"log"

	"github.com/joho/godotenv"
)

func DotEnvInit() {
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found, using environment variables")
	}
}
