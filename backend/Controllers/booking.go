package controllers

import (
	initializers "restapi/code/Initializers"
	"restapi/code/models"

	"github.com/gin-gonic/gin"
)

func Booking(c *gin.Context) {
	var event models.Post
	result := initializers.DB.Find(&event, c.Param("id"))
	if result.Error != nil {
		c.JSON(404, gin.H{
			"Message": "Event not found",
		})
		return
	}
	if event.Strength > 0 {
		event.Strength = event.Strength - 1
		initializers.DB.Model(&event).Updates(models.Post{Strength: event.Strength})
		c.JSON(200, gin.H{
			"Message": "Strength updated successfully!",
			"Data":    event,
		})
		return
	}
	c.JSON(500, gin.H{
		"Message": "Cant allow more participants anymore or event not found!",
	})
}
