package main

import (
	initializers "restapi/code/Initializers"
	"restapi/code/models"
)

func init() {
	initializers.DotEnvInit()
	initializers.DatabaseConnect()
}

func main() {
	initializers.DB.AutoMigrate(&models.Post{})
	initializers.DB.AutoMigrate(&models.User{})
	initializers.DB.AutoMigrate(&models.Organization{})
	initializers.DB.AutoMigrate(&models.UserEvent{})
}
