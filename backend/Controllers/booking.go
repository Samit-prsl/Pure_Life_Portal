package controllers

import (
	initializers "restapi/code/Initializers"
	"restapi/code/models"

	"github.com/gin-gonic/gin"
)

func Booking(c *gin.Context) {
	ID := c.Param("id")
	User, err := c.Get("User")
	if !err {
		c.JSON(500, gin.H{
			"message": "User not found",
		})
		return
	}
	var body struct {
		UserRefer uint
	}
	c.Bind(&body)
	var post models.Post
	initializers.DB.Find(&post, ID)
	body.UserRefer = User.(models.User).ID
	result := initializers.DB.Model(&post).Updates(models.Post{UserRefer: body.UserRefer})
	if result.Error != nil {
		c.JSON(500, gin.H{
			"Message": "Cant update",
		})
		return
	}
	c.JSON(200, gin.H{
		"Message": "Event added to user db",
	})
}
